# Medad (مداد)

<p>Medad (مِداد) is a platform designed to reduce food waste by connecting restaurants that have surplus food with verified charities that distribute food to beneficiaries in need. Currently, surplus food redistribution relies on informal communication methods such as phone calls or manual coordination, which often leads to delays, inefficiency, and unnecessary food waste. At the same time, many individuals and families experience food insecurity despite the availability of safe, edible surplus food.
This problem is worth solving because it addresses two major societal challenges: food waste and hunger. By providing a structured digital platform, Medad ensures that surplus food is redistributed efficiently, safely, and transparently. Restaurants benefit by fulfilling their social responsibility and tracking their contributions, charities gain reliable access to verified food donations, and communities benefit from improved resource utilization and reduced waste.</p>
---

## Installation & Setup

Follow these steps to run the project on your computer:

1.  **Clone the repository:**

2.  **Navigate to the project folder:**
    ```bash
    cd medad-app
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Start the development server:**
    ```bash
    npm start
    ```
    The app will be available at `http://localhost:3000`.
---
## How to Inspect & Test the Prototype

To allow for seamless evaluation, we have configured the following demo accounts. You can use these to log in and explore the specific functionalities of each user role:

| Role | Email | Password | What to Inspect |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@medad.com` | `123456` | Analytics, Account Approvals, & Safety Monitor |
| **Restaurant** | `rest@medad.com` | `123456` | Listing food, Managing requests, & Dashboard |
| **Charity** | `charity@medad.com` | `123456` | Browsing food, Assigning drivers, & Feedback |

---
## Usage examples

### 1. Restaurant Operations 
* **Onboarding:** Use the registration form to join as a food provider.
* **Listing Food:** Navigate to the inventory section to post surplus meals. You can include descriptions, set expiry times, and upload photos.
* **Managing Status:** View all active listings to modify details or remove items once they are no longer available.
* **Fulfillment:** Respond to incoming pickup requests from charities and confirm when the food has been successfully handed over.

### 2. Charity Experience 
* **Discovery:** Access the main feed to browse available food listings. Use search or filters to find specific items or locations.
* **Requesting:** View detailed information for any listing, including safety and handling guidelines, then submit a request.
* **Logistics:** Assign a representative or driver to handle the pickup by providing their contact details.
* **Verification:** Confirm the delivery of food and provide feedback/ratings for the donating restaurant.

### 3. Administrator Control 
* **Monitoring:** Access the dashboard to view system-wide analytics and impact data.
* **Verification:** Review and approve new restaurant or charity registrations to ensure platform safety.
* **Safety & Support:** Moderate active listings and manage user accounts to maintain community standards.
## Team Contribution

---
### **Jawaher: System Foundation**
* **Landing Page:** Responsive home screen.
* **Authentication:** User Login (with validation) and Role Selection.
* **Registration:** Dynamic forms for Restaurants and Charities.
* **Architecture:** Global Navigation, Sidebar, and Routing system.

### **Fatmah: Restaurant Operations**
* **Dashboard:** Overview of active food listings.
* **Inventory Control:** Add Surplus Food Form (Time pickers & File uploads).
* **Management:** My Listings (Edit/Delete logic).
* **Interaction:** Accept/Reject Charity requests and Pickup Confirmation modals.

### **Zahraa: Charity Experience & Verification**
* **Browse Feed:** Real-time search and category filtering.
* **Interaction:** Donation Detail View.
* **Logistics:** Assign Pickup Representative form.
* **Closing Cycle:** Confirm Delivery Page (Photo uploads & Driver info) and Ratings.

### **Sadeem: Administrator Control Panel**
* **Analytics:** Impact charts and data visualization cards.
* **Verification:** Pending User Approval Queue.
* **Security:** Safety Monitor to flag/remove unsafe listings.
* **Management:** User List (Suspend/Reactivate accounts) and Application Settings.
