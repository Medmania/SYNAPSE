function renderMyRegistrations() {
    const container = document.getElementById("my-registrations-container");
    if (!container) { return; }
    container.innerHTML = "";

    const regs = getUserRegistrations();

    if (regs.length === 0) {
        container.innerHTML = `
            <div class="glass-panel p-8 text-center rounded-2xl space-y-3">
                <p class="text-sm text-slate-400">You haven't registered for any events yet.</p>
                <button onclick="switchTab('events')" class="px-4 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">Browse Events</button>
            </div>
        `;
        return;
    }

    regs.forEach(r => {
        const qrId = `qr-${r.regId}`;
        container.innerHTML += `
            <div class="glass-panel p-5 rounded-2xl border-l-4 border-l-emerald-500 flex flex-col md:flex-row justify-between items-center gap-6">
                <div class="space-y-1 text-center md:text-left w-full">
                    <div class="flex items-center gap-2 justify-center md:justify-start">
                        <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase">Confirmed Entry Pass</span>
                        <span class="text-xs text-slate-400">ID: ${r.regId}</span>
                    </div>
                    <h3 class="text-xl font-bold text-white">${r.eventName}</h3>
                    <p class="text-xs text-slate-300">Attendee: <strong>${r.userName}</strong> (${r.userCollege})</p>
                    <p class="text-xs text-slate-400">Day ${r.day} • ${r.venue} • ${r.time}</p>
                    <p class="text-[11px] text-emerald-400 font-semibold pt-1">Fee Paid: ₹${r.feePaid}</p>
                </div>
                <div class="bg-white p-3 rounded-xl flex flex-col items-center shrink-0">
                    <div id="${qrId}"></div>
                    <span class="text-[9px] text-slate-950 font-bold mt-1">SHOW AT VENUE GATE</span>
                </div>
            </div>
        `;

        // Render QR Code after DOM injection
        setTimeout(() => {
            const qrBox = document.getElementById(qrId);
            if (qrBox && qrBox.innerHTML === "") {
                const qr = qrcode(4, 'L');
                qr.addData(`${r.regId}|${r.eventName}|${r.userName}`);
                qr.make();
                qrBox.innerHTML = qr.createImgTag(3, 3);
            }
        }, 50);
    });
}

function clearMyRegistrations() {
    if (confirm("Reset your local registration history?")) {
        localStorage.removeItem("synapse_user_regs");
        updateNavCount();
        renderEventsGrid();
        renderMyRegistrations();
    }
}
