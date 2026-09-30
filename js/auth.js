// js/auth.js - Admin Authentication with Supabase

function openAdminAuthModal() {
    const modal = document.getElementById("admin-auth-modal");
    if (modal) modal.classList.remove("hidden");
}

function closeAdminAuthModal() {
    const modal = document.getElementById("admin-auth-modal");
    if (modal) modal.classList.add("hidden");
    const err = document.getElementById("admin-auth-error");
    if (err) err.classList.add("hidden");
}

async function handleAdminLogin(e) {
    e.preventDefault();
    const email = document.getElementById("admin-email").value;
    const password = document.getElementById("admin-password").value;
    const errorEl = document.getElementById("admin-auth-error");

    try {
        const { data, error } = await _supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;

        closeAdminAuthModal();
        alert("Login successful! Redirecting/Opening Admin Panel...");
        
        // Show Admin Panel UI if element exists or redirect
        const adminSection = document.getElementById("admin-section");
        if (adminSection) {
            adminSection.classList.remove("hidden");
            adminSection.scrollIntoView({ behavior: 'smooth' });
        }
        
    } catch (err) {
        if (errorEl) {
            errorEl.innerText = err.message || "Invalid admin credentials.";
            errorEl.classList.remove("hidden");
        }
    }
}

// Check active admin session on load
async function checkAdminSession() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        const adminSection = document.getElementById("admin-section");
        if (adminSection) adminSection.classList.remove("hidden");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkAdminSession();
});
