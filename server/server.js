const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();
const transporter = require('../src/components/emailSender');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const puppeteer = require('puppeteer');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
      secret: 'your-secret-key', // Replace with a secret key
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 3600000, // Session expiration time (in milliseconds)
      },
    })
  );


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/react', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
// Define a schema and model for user data (e.g., User)
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


// Create a schema for image metadata
const imageSchema = new mongoose.Schema({
  username: String,
  email: String,
  filename: String,
});

const Image = mongoose.model('Image', imageSchema);



// Set up multer for image upload
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });



// API endpoint for image upload
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { username, email } = req.body;
    const image = new Image({ username, email, filename: req.file.filename });
    await image.save();
    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});

// Serve images statically from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create a route to handle user registration
app.post('/api/register', async (req, res) => {
  try {
    // const newUser = new User(req.body);

    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      res.json({ message: 'Email already exists' });
    } else {
      // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
    });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful...!' });
    }
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
});




// Assuming you have a route for user login
app.post('/api/login', async (req, res) => {
    try {
        // const newUser = new User(req.body);
    const { email, password } = req.body;
  
    //   // Find the user by email in the database
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password..!' });
      }
  
    //   // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password..2' });
      }
  
      req.session.isLoggedIn = true;
      req.session.username = user.username;
  res.status(201).json({ message: req.session.username });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Login failed' });
    }
  });
  

  app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Logout failed' });
      } else {
        res.clearCookie('connect.sid'); // Clear the session cookie
        res.status(200).json({ message: 'Logout successful' });
      }
    });
  });
  

  // Node.js server code

app.get('/get-session-data', (req, res) => {
    // if (req.session.isLoggedIn) {
    //   res.json({ username: 'mukeshkanna' });
    // } else {
    //   res.status(401).json({ message: 'User not authenticated' });
    // }

    res.json({ username: 'mukeshkanna' });
  });
  
  

//   const itemSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//   });
  
//   const Item = mongoose.model('User', itemSchema);
  
  app.get('/api/items', async (req, res) => {
    try {
        const items = await User.find(); // Retrieve items from the database
        res.json(items);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
  });


  app.get('/api/Userdata/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const items = await User.findById(id); // Retrieve items from the database
         res.json(items);
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
  });


// Update an item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const { username, email } = req.body;
    const updatedItem = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Delete an item by ID
app.delete('/api/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



app.post('/api/send-email/:email', async (req, res) => {
  try {
    const { subject, text } = req.body;

    const mailOptions = {
      from: 'pcbs@pcnl.in',
      to : req.params.email,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/generate-pdf', (req, res) => {
  // Create a new PDF document
  const doc = new PDFDocument();

  // Set the response headers to indicate that it's a PDF
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="example.pdf"');

  // Pipe the PDF to the response stream
  doc.pipe(res);

  // Add content to the PDF
  doc.text('Hello, world!');

  // End the PDF generation
  doc.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
