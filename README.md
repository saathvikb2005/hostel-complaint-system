# **FixMyStay - Hostel Complaint Management System**  

## **📌 Project Overview**  
**FixMyStay** is a web-based **hostel complaint management system** that allows students to **submit and track complaints online**, ensuring a smooth and transparent resolution process. Administrators can **manage complaints efficiently**, categorize them, and update their status in real-time.  

## **✨ Features**  
✅ **Student Features**  
- **Register & Login** securely  
- **File complaints** with title, description, category, and room number  
- **Track complaint status** (Pending, In Progress, Resolved)  
- **Edit or delete** complaints (if pending)  

✅ **Admin Features**  
- **View all complaints** with filters (status, category)  
- **Update complaint status** & leave remarks  
- **Assign complaints** to departments/staff  
- **Manage contacts & announcements**  

✅ **General Features**  
- **User-friendly dashboard** for students and admins  
- **Secure authentication system**  
- **Responsive UI** for mobile and desktop  

## **🛠️ Tech Stack**  
- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MySQL  
- **Hosting**: Render / InfinityFree (for database)  

## **📂 Project Structure**  
```
/FixMyStay
│── /images             # Stores images used in the project
│── /models             # Database models
│── /node_modules       # Dependencies installed via npm
│── /routes             # Backend API routes
│── /scripts            # Additional scripts for functionality
│── /styles             # CSS and styling files
│── .env                # Environment variables (database config, secrets)
│── .gitattributes      # Git attributes file
│── announcements.html  # Announcements page
│── complaint-form.html # Complaint submission page
│── complaints.html     # Complaints listing page
│── contacts.html       # Contact management page
│── dashboard.html      # Dashboard for students & admins
│── database.sql        # SQL file for database schema
│── db.js               # Database connection script
│── home.html           # Homepage of the system
│── index.html          # Main entry page
│── package.json        # Dependencies & scripts
│── package-lock.json   # Lock file for dependencies
│── server.js           # Main backend server file
│── signup.html         # Signup page

```  

## **🚀 Setup & Installation**  
### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/saathvikb2005/hostel-complaint-system
cd hostel-complaint-system
```  

### **2️⃣ Install Dependencies**  
```bash
npm install
```  

### **3️⃣ Configure Environment Variables**  
Create a `.env` file in the root directory and add:  
```
PORT=3001
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
```  

### **4️⃣ Start the Server**  
```bash
node server.js
```  
The backend will run on **http://localhost:3001**  

## **🌐 Deployment**  
- **Frontend Hosting**: Can be deployed on **Netlify, Vercel**  
- **Backend Hosting**: Can be hosted on **Render**  
- **Database Hosting**: Using **InfinityFree MySQL**    
