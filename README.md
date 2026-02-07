# smart-visitor-management-system

A role-based **Visitor Management System** frontend built using **React** for campus environments.  
The system digitizes visitor entry, approval, verification, and logging through clearly separated user roles.

> ⚠️ Frontend-only implementation using mock data. Backend integration is planned.

---

## 🚀 Features

### 👥 Role-Based Access
- Admin
- Guest
- Security Guard

Each role has its own login, dashboard, and permitted actions.

---

## 🧑‍💼 Admin Module
- Approve / Deny guest visit requests
- Assign internal host (faculty/staff) to approved guests
- View complete visitor logs (audit)
- View visitor statistics (graph: visitors vs date)

---

## 👤 Guest Module
- Guest login (simulated)
- Submit visit request (pre-registration)
- View request status (Pending / Approved / Denied)
- Status can be shown at the gate

---

## 🛡️ Security Guard Module
- Gate dashboard
- Verify pre-registered visitors
- Allow or deny entry based on approval status
- (On-the-spot visitor handling planned)

---

## 📊 Visitor Analytics
- Admin can view visitor statistics
- Bar chart showing **number of visitors vs date**
- Opens in a modal popup (70% screen)
- Built using `chart.js` and `react-chartjs-2`

---

## 🗂️ Project Structure
<img width="337" height="516" alt="image" src="https://github.com/user-attachments/assets/44dbcc16-936e-4d14-9638-c4e879ed9f6b" />

---

## 🎨 UI Design
- Clean, minimal, professional layout
- Consistent color palette
- Inline styling for simplicity
- Modular and reusable components

---

## 🛠️ Tech Stack
- React (JSX)
- React Router
- Chart.js
- react-chartjs-2

---

## ❌ Current Limitations
- No backend
- No database
- Authentication is simulated
- Data is mock/static

---

## 🔮 Future Enhancements
- Backend integration
- Database support
- Real authentication
- QR-based visitor passes
- On-the-spot visitor entry
- Advanced analytics
- Mobile responsiveness

---
