import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu1A8QWZl3DoGRKV9uWtyK_8VpdyXBFCM",
    authDomain: "ics-iit-kanpur.firebaseapp.com",
    projectId: "ics-iit-kanpur",
    storageBucket: "ics-iit-kanpur.appspot.com", // ✅ Fixed storageBucket
    messagingSenderId: "765385925923",
    appId: "1:765385925923:web:1b4986566d1d0a75b5d896"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to Submit a Testimonial
async function submitTestimonial() {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && message) {
        try {
            await addDoc(collection(db, "testimonials"), {
                name: name,
                message: message,
                timestamp: serverTimestamp()
            });

            alert("Testimonial submitted successfully!");
            document.getElementById("name").value = "";
            document.getElementById("message").value = "";
            loadTestimonials(); // Refresh testimonials
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    } else {
        alert("Please enter both name and testimonial.");
    }
}

// Function to Load Testimonials
async function loadTestimonials() {
    const container = document.getElementById("testimonials-container");
    container.innerHTML = ""; // Clear existing content

    try {
        const q = query(collection(db, "testimonials"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const testimonial = document.createElement("div");
            testimonial.classList.add("testimonial");
            testimonial.innerHTML = `<h3>${data.name}</h3><p>${data.message}</p>`;
            container.appendChild(testimonial);
        });

    } catch (error) {
        console.error("Error fetching testimonials: ", error);
    }
}

// Attach event listener to the submit button
document.getElementById("submitBtn").addEventListener("click", submitTestimonial);

// Load testimonials when the page loads
document.addEventListener("DOMContentLoaded", loadTestimonials);
