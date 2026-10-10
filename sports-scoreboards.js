/**
 * SYNAPSE '26 - Modular Sports Scoreboard System
 * Add or modify sports easily by adding a new key to SportsRegistry.
 */

const SportsRegistry = {
    cricket: {
        label: "Cricket",
        icon: "fa-baseball-bat-ball",
        colorClass: "amber",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-slate-800">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20"><i class="fa-solid fa-baseball-bat-ball mr-1"></i> Cricket</span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-2">
                    <div class="flex justify-between items-center text-xs">
                        <span class="font-bold text-slate-200">${r.teamA || 'Team A'}</span>
                        <span class="font-mono text-emerald-400 font-black text-sm">${r.runsA || 0}/${r.wicketsA || 0} <span class="text-[10px] text-slate-500">(${r.oversA || 0} ov)</span></span>
                    </div>
                    <div class="flex justify-between items-center text-xs">
                        <span class="font-bold text-slate-200">${r.teamB || 'Team B'}</span>
                        <span class="font-mono text-emerald-400 font-black text-sm">${r.runsB || 0}/${r.wicketsB || 0} <span class="text-[10px] text-slate-500">(${r.oversB || 0} ov)</span></span>
                    </div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-amber-400">🏏 Cricket: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="crk-teamA-${e.id}" value="${r.teamA || ''}" placeholder="Team A Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="text" id="crk-teamB-${e.id}" value="${r.teamB || ''}" placeholder="Team B Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="text" id="crk-scoreA-${e.id}" value="${r.runsA ? r.runsA + '/' + r.wicketsA : ''}" placeholder="Team A Runs/Wickets (142/4)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 font-mono text-slate-100">
                    <input type="text" id="crk-scoreB-${e.id}" value="${r.runsB ? r.runsB + '/' + r.wicketsB : ''}" placeholder="Team B Runs/Wickets (120/8)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 font-mono text-slate-100">
                    <input type="text" id="crk-oversA-${e.id}" value="${r.oversA || ''}" placeholder="Overs A (19.4)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="text" id="crk-oversB-${e.id}" value="${r.oversB || ''}" placeholder="Overs B (20.0)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                </div>
                <input type="text" id="crk-status-${e.id}" value="${r.status || ''}" placeholder="Status (e.g. MAMC need 12 runs off 6 balls)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                <input type="text" id="crk-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Name" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                <button onclick="saveSportScore('${e.id}', 'cricket')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded">Update Cricket Score</button>
            </div>`,
        extractData: (eventId) => {
            const sA = (document.getElementById(`crk-scoreA-${eventId}`).value || "").split("/");
            const sB = (document.getElementById(`crk-scoreB-${eventId}`).value || "").split("/");
            return {
                sportType: "cricket",
                teamA: document.getElementById(`crk-teamA-${eventId}`).value,
                teamB: document.getElementById(`crk-teamB-${eventId}`).value,
                runsA: sA[0] || 0, wicketsA: sA[1] || 0,
                runsB: sB[0] || 0, wicketsB: sB[1] || 0,
                oversA: document.getElementById(`crk-oversA-${eventId}`).value,
                oversB: document.getElementById(`crk-oversB-${eventId}`).value,
                status: document.getElementById(`crk-status-${eventId}`).value,
                winner: document.getElementById(`crk-win-${eventId}`).value
            };
        }
    },

    football: {
        label: "Football",
        icon: "fa-futbol",
        colorClass: "teal",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-slate-800">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20"><i class="fa-solid fa-futbol mr-1"></i> Football</span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex justify-around items-center text-center">
                    <div><p class="text-xs font-bold text-slate-200">${r.teamA || 'Team A'}</p><p class="text-2xl font-black text-emerald-400 font-mono">${r.scoreA || 0}</p></div>
                    <span class="text-xs text-slate-500 font-bold">VS</span>
                    <div><p class="text-xs font-bold text-slate-200">${r.teamB || 'Team B'}</p><p class="text-2xl font-black text-emerald-400 font-mono">${r.scoreB || 0}</p></div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-teal-400">⚽ Football: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="fb-teamA-${e.id}" value="${r.teamA || ''}" placeholder="Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="text" id="fb-teamB-${e.id}" value="${r.teamB || ''}" placeholder="Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="number" id="fb-scoreA-${e.id}" value="${r.scoreA || 0}" placeholder="Goals A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="number" id="fb-scoreB-${e.id}" value="${r.scoreB || 0}" placeholder="Goals B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                </div>
                <input type="text" id="fb-status-${e.id}" value="${r.status || ''}" placeholder="Status (2nd Half - 82')" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                <input type="text" id="fb-win-${e.id}" value="${r.winner || ''}" placeholder="Winner" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-teal-300">
                <button onclick="saveSportScore('${e.id}', 'football')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded">Update Football Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "football",
            teamA: document.getElementById(`fb-teamA-${eventId}`).value,
            teamB: document.getElementById(`fb-teamB-${eventId}`).value,
            scoreA: document.getElementById(`fb-scoreA-${eventId}`).value,
            scoreB: document.getElementById(`fb-scoreB-${eventId}`).value,
            status: document.getElementById(`fb-status-${eventId}`).value,
            winner: document.getElementById(`fb-win-${eventId}`).value
        })
    },

    badminton: {
        label: "Badminton / Table Tennis / Volleyball",
        icon: "fa-table-tennis-paddle-ball",
        colorClass: "emerald",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-slate-800">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20"><i class="fa-solid fa-table-tennis-paddle-ball mr-1"></i> ${e.sportType.toUpperCase()}</span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.currentSet || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <div class="flex justify-between"><span>Set 1:</span><span class="font-mono text-emerald-400 font-bold">${r.set1 || '-'}</span></div>
                    <div class="flex justify-between"><span>Set 2:</span><span class="font-mono text-emerald-400 font-bold">${r.set2 || '-'}</span></div>
                    ${r.set3 ? `<div class="flex justify-between"><span>Set 3:</span><span class="font-mono text-emerald-400 font-bold">${r.set3}</span></div>` : ''}
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-emerald-400">🏸 Racket / Volleyball: ${e.title}</h4>
                <div class="grid grid-cols-3 gap-2">
                    <input type="text" id="rac-set1-${e.id}" value="${r.set1 || ''}" placeholder="Set 1 (21-18)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="text" id="rac-set2-${e.id}" value="${r.set2 || ''}" placeholder="Set 2 (19-21)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="text" id="rac-set3-${e.id}" value="${r.set3 || ''}" placeholder="Set 3 (21-15)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                </div>
                <input type="text" id="rac-status-${e.id}" value="${r.currentSet || ''}" placeholder="Current Status (e.g. Match Over / Set 3 In Progress)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                <input type="text" id="rac-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Name" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-emerald-300">
                <button onclick="saveSportScore('${e.id}', 'badminton')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded">Update Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "badminton",
            set1: document.getElementById(`rac-set1-${eventId}`).value,
            set2: document.getElementById(`rac-set2-${eventId}`).value,
            set3: document.getElementById(`rac-set3-${eventId}`).value,
            currentSet: document.getElementById(`rac-status-${eventId}`).value,
            winner: document.getElementById(`rac-win-${eventId}`).value
        })
    },

    chess: {
        label: "Chess",
        icon: "fa-chess",
        colorClass: "purple",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-slate-800">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20"><i class="fa-solid fa-chess mr-1"></i> Chess</span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.boardNo || 'Board'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                    <div>⚪ White: <strong>${r.white || '-'}</strong></div>
                    <div>⚫ Black: <strong>${r.black || '-'}</strong></div>
                    <p class="text-[11px] text-slate-400 pt-1 font-mono">${r.moves || ''}</p>
                </div>
                ${r.result ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-crown mr-1"></i> Result: ${r.result}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-purple-400">♟️ Chess: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="chs-w-${e.id}" value="${r.white || ''}" placeholder="White Player" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                    <input type="text" id="chs-b-${e.id}" value="${r.black || ''}" placeholder="Black Player" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                </div>
                <input type="text" id="chs-board-${e.id}" value="${r.boardNo || ''}" placeholder="Board / Round (e.g. Board #1 - Final)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100">
                <input type="text" id="chs-res-${e.id}" value="${r.result || ''}" placeholder="Result (1-0 White Won / 1/2-1/2 Draw)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                <button onclick="saveSportScore('${e.id}', 'chess')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded">Update Chess Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "chess",
            white: document.getElementById(`chs-w-${eventId}`).value,
            black: document.getElementById(`chs-b-${eventId}`).value,
            boardNo: document.getElementById(`chs-board-${eventId}`).value,
            result: document.getElementById(`chs-res-${eventId}`).value
        })
    },

    table_tennis: {
        label: "Table Tennis",
        icon: "fa-table-tennis-paddle-ball",
        colorClass: "teal"
    },
    volleyball: {
        label: "Volleyball",
        icon: "fa-volleyball",
        colorClass: "emerald"
    }
};

// Fallback logic for generic events
SportsRegistry.table_tennis.renderCard = SportsRegistry.badminton.renderCard;
SportsRegistry.table_tennis.renderForm = SportsRegistry.badminton.renderForm;
SportsRegistry.table_tennis.extractData = SportsRegistry.badminton.extractData;

SportsRegistry.volleyball.renderCard = SportsRegistry.badminton.renderCard;
SportsRegistry.volleyball.renderForm = SportsRegistry.badminton.renderForm;
SportsRegistry.volleyball.extractData = SportsRegistry.badminton.extractData;

/**
 * Global caller functions
 */
function renderSportCardModular(event) {
    const type = event.sportType || "none";
    if (SportsRegistry[type] && SportsRegistry[type].renderCard) {
        return SportsRegistry[type].renderCard(event, event.results || {});
    }
    // Default fallback
    const r = event.results || {};
    return `
        <div class="glass-panel p-5 rounded-2xl border border-slate-800">
            <h3 class="text-base font-bold text-slate-100">${event.title}</h3>
            ${r.winner ? `<p class="mt-2 text-xs text-amber-300 font-bold">🥇 1st Place: ${r.winner}</p>` : ''}
            ${r.runnerUp ? `<p class="text-xs text-slate-300 font-semibold">🥈 2nd Place: ${r.runnerUp}</p>` : ''}
        </div>`;
}

function renderSportEditorModular(event) {
    const type = event.sportType || "none";
    if (SportsRegistry[type] && SportsRegistry[type].renderForm) {
        return SportsRegistry[type].renderForm(event, event.results || {});
    }
    const r = event.results || {};
    return `
        <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
            <h4 class="font-bold text-slate-200">${event.title}</h4>
            <div class="grid grid-cols-2 gap-2">
                <input type="text" id="gen-win-${event.id}" value="${r.winner || ''}" placeholder="🥇 Winner" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                <input type="text" id="gen-run-${event.id}" value="${r.runnerUp || ''}" placeholder="🥈 Runner Up" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200">
            </div>
            <button onclick="saveGeneralScore('${event.id}')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1 rounded">Publish Results</button>
        </div>`;
}
