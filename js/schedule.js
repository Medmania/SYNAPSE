let currentScheduleDay = 1;

function switchDay(dayNum) {
    currentScheduleDay = dayNum;
    document.querySelectorAll(".day-tab").forEach(btn => {
        btn.className = "day-tab px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-800 bg-slate-900 text-slate-400";
    });
    const activeBtn = document.getElementById(`day-btn-${dayNum}`);
    if (activeBtn) {
        activeBtn.className = "day-tab px-3 py-1.5 text-xs font-bold rounded-lg border border-emerald-500/50 bg-emerald-500/20 text-emerald-300";
    }
    renderSchedule();
}

function renderSchedule() {
    const tbody = document.getElementById("schedule-table-body");
    if (!tbody) { return; }
    tbody.innerHTML = "";
    
    const events = getEvents().filter(e => Number(e.day) === Number(currentScheduleDay));

    if (events.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-500 text-xs">No events scheduled for Day ${currentScheduleDay}.</td></tr>`;
        return;
    }

    events.forEach(ev => {
        const feeText = ev.fee === 0 ? "<span class='text-emerald-400 font-bold'>Free</span>" : `₹${ev.fee}`;
        tbody.innerHTML += `
            <tr class="hover:bg-slate-900/40 transition">
                <td class="py-3.5 px-4 font-mono text-xs text-slate-400">${ev.time}</td>
                <td class="py-3.5 px-4 font-bold text-white">${ev.name}</td>
                <td class="py-3.5 px-4"><span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">${ev.category}</span></td>
                <td class="py-3.5 px-4 text-slate-300">${ev.venue}</td>
                <td class="py-3.5 px-4 text-right">${feeText}</td>
            </tr>
        `;
    });
}
