// Supabase Cloud Configuration
const SUPABASE_URL = "https://ccsgewccyyexfgrmflig.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjc2dld2NjeXlleGZncm1mbGlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3ODg0MDEsImV4cCI6MjEwNjM2NDQwMX0.8yolMynIAGtN41qsUCxLASpx_rszxDMUoskBvQJvQGo";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// In-Memory Data Caches
let cachedEvents = [];
let cachedUserRegistrations = [];

const defaultEvents = [
    { name: "Battle of the Bands", category: "Cultural", fee: 500, day: 2, time: "5:00 PM - 9:00 PM", venue: "Main Stage", desc: "Live music competition for college rock bands." },
    { name: "Futsal Championship", category: "Sports", fee: 300, day: 1, time: "10:00 AM - 4:00 PM", venue: "OBH Ground", desc: "5v5 fast-paced indoor-style football tournament." },
    { name: "Call of Duty / PUBG Mobile", category: "E-Sports", fee: 200, day: 1, time: "2:00 PM - 6:00 PM", venue: "LT-1 Gaming Zone", desc: "Squad battle royale tournament." },
    { name: "Western Group Dance", category: "Cultural", fee: 400, day: 2, time: "2:00 PM - 5:00 PM", venue: "Main Auditorium", desc: "Inter-college choreo dance competition." },
    { name: "Star Night - Celebrity Pass", category: "Flagship", fee: 0, day: 3, time: "7:00 PM Onwards", venue: "Main Grounds", desc: "Exclusive entry pass for live concert night." }
];

// Initialize Data on Load
async function initData() {
    await fetchEventsFromCloud();
    await fetchUserRegistrationsFromCloud();
}

// -------------------------------------------------------------
// EVENT MANAGEMENT FUNCTIONS (SUPABASE SYNC)
// -------------------------------------------------------------

function getEvents() {
    return cachedEvents;
}

async function fetchEventsFromCloud() {
    try {
        const { data, error } = await _supabase.from('events').select('*').order('id', { ascending: true });
        if (error) throw error;

        if (!data || data.length === 0) {
            // Seed database with default events if table is empty
            const { data: seededData, error: seedError } = await _supabase.from('events').insert(defaultEvents).select('*');
            if (seedError) throw seedError;
            cachedEvents = seededData || [];
        } else {
            cachedEvents = data;
        }
    } catch (err) {
        console.error("Error fetching events from Supabase:", err);
        // Fallback to local storage or defaults if network fails
        const local = localStorage.getItem("synapse_events");
        cachedEvents = local ? JSON.parse(local) : defaultEvents;
    }
    return cachedEvents;
}

async function saveEventsData(eventData) {
    try {
        const { data, error } = await _supabase.from('events').upsert([eventData]).select('*');
        if (error) throw error;
        await fetchEventsFromCloud();
    } catch (err) {
        console.error("Error saving event to Supabase:", err);
        alert("Failed to save event to cloud database.");
    }

    renderEventsGrid();
    renderSchedule();
    if (typeof updateAdminStats === "function") { updateAdminStats(); }
}

async function deleteEventFromCloud(eventId) {
    try {
        const { error } = await _supabase.from('events').delete().eq('id', eventId);
        if (error) throw error;
        await fetchEventsFromCloud();
    } catch (err) {
        console.error("Error deleting event from Supabase:", err);
        alert("Failed to delete event from cloud database.");
    }

    renderEventsGrid();
    renderSchedule();
    if (typeof updateAdminStats === "function") { updateAdminStats(); }
}

// -------------------------------------------------------------
// USER REGISTRATION FUNCTIONS (SUPABASE SYNC)
// -------------------------------------------------------------

function getUserRegistrations() {
    return cachedUserRegistrations;
}

async function fetchUserRegistrationsFromCloud() {
    try {
        const { data, error } = await _supabase.from('registrations').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        cachedUserRegistrations = data.map(r => ({
            id: r.id,
            regId: r.reg_id,
            eventId: r.event_id,
            eventName: r.event_name,
            userName: r.user_name,
            userCollege: r.user_college,
            userPhone: r.user_phone,
            feePaid: r.fee_paid,
            timestamp: new Date(r.created_at).toLocaleDateString()
        }));
    } catch (err) {
        console.error("Error fetching registrations from Supabase:", err);
        const local = localStorage.getItem("synapse_user_regs");
        cachedUserRegistrations = local ? JSON.parse(local) : [];
    }

    updateNavCount();
    if (typeof updateAdminStats === "function") { updateAdminStats(); }
    return cachedUserRegistrations;
}

async function saveUserRegistrationData(regRecord) {
    try {
        const payload = {
            reg_id: regRecord.regId,
            event_id: regRecord.eventId,
            event_name: regRecord.eventName,
            user_name: regRecord.userName,
            user_college: regRecord.userCollege,
            user_phone: regRecord.userPhone,
            fee_paid: regRecord.feePaid
        };

        const { error } = await _supabase.from('registrations').insert([payload]);
        if (error) throw error;
        await fetchUserRegistrationsFromCloud();
    } catch (err) {
        console.error("Error saving registration to Supabase:", err);
        alert("Cloud registration sync failed. Saving locally.");
        
        // Local fallback
        const local = getUserRegistrations();
        local.push(regRecord);
        localStorage.setItem("synapse_user_regs", JSON.stringify(local));
        cachedUserRegistrations = local;
    }

    updateNavCount();
    if (typeof updateAdminStats === "function") { updateAdminStats(); }
}

function updateNavCount() {
    const count = getUserRegistrations().length;
    const badge = document.getElementById("nav-reg-count");
    if (badge) {
        badge.innerText = count;
        if (count > 0) { badge.classList.remove("hidden"); } else { badge.classList.add("hidden"); }
    }
}
