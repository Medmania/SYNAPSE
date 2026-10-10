/**
 * SYNAPSE '26 - Comprehensive Modular Sports & Esports Scoreboard System
 * Covers: Outdoor, Indoor/Racket, Powerlifting/Arm Wrestling, and Console/PC/Mobile Esports.
 */

const SportsRegistry = {
    // ==========================================
    // 1. OUTDOOR SPORTS
    // ==========================================

    // EXTENSIVE REALISTIC CRICKET (T10 / Box Cricket)
    cricket: {
        label: "Cricket (T10 / Box)",
        icon: "fa-baseball-bat-ball",
        colorClass: "amber",
        renderCard: (e, r) => {
            const b1SR = r.b1_balls > 0 ? ((r.b1_runs / r.b1_balls) * 100).toFixed(1) : "0.0";
            const b2SR = r.b2_balls > 0 ? ((r.b2_runs / r.b2_balls) * 100).toFixed(1) : "0.0";
            const bowlEcon = r.bw_overs > 0 ? (r.bw_runs / r.bw_overs).toFixed(1) : "0.0";

            return `
            <div class="glass-panel p-5 rounded-2xl border border-amber-500/30 bg-slate-950/90 shadow-xl">
                <!-- Header Status -->
                <div class="flex justify-between items-center mb-3 pb-2 border-b border-slate-800">
                    <span class="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                        <i class="fa-solid fa-baseball-bat-ball mr-1"></i> ${r.format || 'T10 Box Cricket'}
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 animate-pulse">
                        ● ${r.status || 'Match In Progress'}
                    </span>
                </div>

                <h3 class="text-base font-extrabold text-slate-100">${e.title}</h3>

                <!-- Live Score Summary Box -->
                <div class="my-3 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 space-y-2">
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-slate-200 text-sm">${r.teamA || 'Team A'}</span>
                        <span class="font-mono text-amber-400 font-black text-base">
                            ${r.runsA || 0}/${r.wicketsA || 0} <span class="text-xs text-slate-400 font-normal">(${r.oversA || '0.0'}/${r.maxOvers || 10} ov)</span>
                        </span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-bold text-slate-200 text-sm">${r.teamB || 'Team B'}</span>
                        <span class="font-mono text-amber-400 font-black text-base">
                            ${r.runsB || 0}/${r.wicketsB || 0} <span class="text-xs text-slate-400 font-normal">(${r.oversB || '0.0'}/${r.maxOvers || 10} ov)</span>
                        </span>
                    </div>
                    ${r.equation ? `<div class="mt-2 text-[11px] font-semibold text-emerald-300 bg-emerald-950/50 p-1.5 rounded text-center border border-emerald-800/40">${r.equation}</div>` : ''}
                </div>

                <!-- Live Batting Crease Table -->
                <div class="my-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 text-xs">
                    <div class="text-[10px] uppercase tracking-wider text-slate-400 font-bold mb-1 flex justify-between border-b border-slate-800 pb-1">
                        <span>Batter</span>
                        <span>R (B) • 4s/6s • SR</span>
                    </div>
                    <div class="flex justify-between items-center py-0.5 text-slate-200">
                        <span class="font-semibold text-amber-300">${r.b1_name || 'Batter 1'} *</span>
                        <span class="font-mono">${r.b1_runs || 0} (${r.b1_balls || 0}) • <span class="text-slate-400">${r.b1_fours || 0}/${r.b1_sixes || 0}</span> • <span class="text-emerald-400 font-bold">${b1SR}</span></span>
                    </div>
                    <div class="flex justify-between items-center py-0.5 text-slate-300">
                        <span>${r.b2_name || 'Batter 2'}</span>
                        <span class="font-mono">${r.b2_runs || 0} (${r.b2_balls || 0}) • <span class="text-slate-400">${r.b2_fours || 0}/${r.b2_sixes || 0}</span> • <span class="text-emerald-400 font-bold">${b2SR}</span></span>
                    </div>
                </div>

                <!-- Live Bowler & Over Stats -->
                <div class="my-3 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 text-xs flex justify-between items-center">
                    <div>
                        <span class="text-[10px] text-slate-400 block uppercase font-semibold">Bowler</span>
                        <span class="font-bold text-slate-200">${r.bw_name || 'Bowler'}</span>
                    </div>
                    <div class="text-right font-mono">
                        <span class="text-amber-400 font-bold">${r.bw_wickets || 0}-${r.bw_runs || 0}</span>
                        <span class="text-slate-400 text-[11px]"> (${r.bw_overs || '0.0'} ov, Econ: ${bowlEcon})</span>
                    </div>
                </div>

                <!-- Recent Over Ball Log & Extras -->
                <div class="flex justify-between items-center text-[11px] font-mono bg-slate-900/40 p-2 rounded-lg border border-slate-800/50">
                    <span class="text-slate-400">This Over: <strong class="text-emerald-400">${r.recentBalls || '0 1 4 W 0 6'}</strong></span>
                    <span class="text-slate-400">Extras: <strong class="text-slate-200">${r.extras || '0'}</strong></span>
                </div>

                <!-- Match Winner & Player of Match -->
                ${r.winner ? `
                <div class="mt-3 pt-2 border-t border-slate-800 text-xs space-y-1">
                    <p class="text-amber-300 font-bold"><i class="fa-solid fa-trophy text-amber-400 mr-1"></i> Winner: ${r.winner}</p>${r.potm ? `<p class="text-slate-300 font-medium"><i class="fa-solid fa-star text-amber-400 mr-1"></i> Player of the Match: ${r.potm}</p>` : ''}
                </div>` : ''}
            </div>`;
        },
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-3 text-xs">
                <h4 class="font-bold text-amber-400 flex items-center gap-1.5"><i class="fa-solid fa-baseball-bat-ball"></i> Live Cricket Scorecard Manager: ${e.title}</h4>
                
                <div class="grid grid-cols-3 gap-2">
                    <div><label class="block text-slate-400 mb-0.5">Team A Name</label><input type="text" id="crk-teamA-${e.id}" value="${r.teamA || ''}" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100"></div>
                    <div><label class="block text-slate-400 mb-0.5">Team B Name</label><input type="text" id="crk-teamB-${e.id}" value="${r.teamB || ''}" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100"></div>
                    <div><label class="block text-slate-400 mb-0.5">Format</label><input type="text" id="crk-fmt-${e.id}" value="${r.format || 'T10 Box Cricket'}" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-100"></div>
                </div>

                <div class="grid grid-cols-4 gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <div><label class="block text-slate-400 text-[10px]">Team A Score (Runs/Wkts)</label><input type="text" id="crk-scoreA-${e.id}" value="${r.runsA ? r.runsA + '/' + r.wicketsA : ''}" placeholder="85/4" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 font-mono text-amber-300"></div>
                    <div><label class="block text-slate-400 text-[10px]">Team A Overs</label><input type="text" id="crk-oversA-${e.id}" value="${r.oversA || ''}" placeholder="10.0" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-100"></div>
                    <div><label class="block text-slate-400 text-[10px]">Team B Score (Runs/Wkts)</label><input type="text" id="crk-scoreB-${e.id}" value="${r.runsB ? r.runsB + '/' + r.wicketsB : ''}" placeholder="62/3" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 font-mono text-amber-300"></div>
                    <div><label class="block text-slate-400 text-[10px]">Team B Overs</label><input type="text" id="crk-oversB-${e.id}" value="${r.oversB || ''}" placeholder="7.2" class="w-full bg-slate-900 border border-slate-900 rounded px-2 py-1 text-slate-100"></div>
                </div>

                <!-- On-Crease Batters Info -->
                <div class="space-y-1.5 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span class="font-bold text-slate-300 text-[11px]">On-Crease Batters</span>
                    <div class="grid grid-cols-5 gap-1.5">
                        <input type="text" id="crk-b1name-${e.id}" value="${r.b1_name || ''}" placeholder="Striker Name" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b1runs-${e.id}" value="${r.b1_runs || 0}" placeholder="Runs" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b1balls-${e.id}" value="${r.b1_balls || 0}" placeholder="Balls" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b1fours-${e.id}" value="${r.b1_fours || 0}" placeholder="4s" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b1sixes-${e.id}" value="${r.b1_sixes || 0}" placeholder="6s" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                    </div>
                    <div class="grid grid-cols-5 gap-1.5">
                        <input type="text" id="crk-b2name-${e.id}" value="${r.b2_name || ''}" placeholder="Non-Striker" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b2runs-${e.id}" value="${r.b2_runs || 0}" placeholder="Runs" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b2balls-${e.id}" value="${r.b2_balls || 0}" placeholder="Balls" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b2fours-${e.id}" value="${r.b2_fours || 0}" placeholder="4s" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                        <input type="number" id="crk-b2sixes-${e.id}" value="${r.b2_sixes || 0}" placeholder="6s" class="bg-slate-900 border border-slate-800 rounded px-2 py-1">
                    </div>
                </div>

                <!-- Bowler & Live Over -->
                <div class="grid grid-cols-4 gap-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <div><label class="block text-slate-400 text-[10px]">Bowler Name</label><input type="text" id="crk-bwname-${e.id}" value="${r.bw_name || ''}" placeholder="Bowler" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1"></div>
                    <div><label class="block text-slate-400 text-[10px]">Bowler Overs</label><input type="text" id="crk-bwovers-${e.id}" value="${r.bw_overs || ''}" placeholder="1.4" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1"></div>
                    <div><label class="block text-slate-400 text-[10px]">Runs Conceded</label><input type="number" id="crk-bwruns-${e.id}" value="${r.bw_runs || 0}" placeholder="18" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1"></div>
                    <div><label class="block text-slate-400 text-[10px]">Wickets Taken</label><input type="number" id="crk-bwwkts-${e.id}" value="${r.bw_wickets || 0}" placeholder="2" class="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1"></div>
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="crk-recent-${e.id}" value="${r.recentBalls || ''}" placeholder="Recent Balls (e.g. 1 4 W 0 6 1wd)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 font-mono">
                    <input type="text" id="crk-equation-${e.id}" value="${r.equation || ''}" placeholder="Equation (e.g. Team B needs 24 runs in 16 balls)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>

                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="crk-status-${e.id}" value="${r.status || ''}" placeholder="Match Status (e.g. 2nd Innings Live)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="crk-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Team" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300 font-bold">
                </div>

                <button onclick="saveSportScore('${e.id}', 'cricket')" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs w-full shadow-lg">Update Cricket Scorecard</button>
            </div>`;
        },
        extractData: (eventId) => {
            const sA = (document.getElementById(`crk-scoreA-${eventId}`).value || "").split("/");
            const sB = (document.getElementById(`crk-scoreB-${eventId}`).value || "").split("/");
            return {
                sportType: "cricket",
                format: document.getElementById(`crk-fmt-${eventId}`).value,
                teamA: document.getElementById(`crk-teamA-${eventId}`).value,
                teamB: document.getElementById(`crk-teamB-${eventId}`).value,
                runsA: Number(sA[0]) || 0, wicketsA: Number(sA[1]) || 0,
                oversA: document.getElementById(`crk-oversA-${eventId}`).value,
                runsB: Number(sB[0]) || 0, wicketsB: Number(sB[1]) || 0,
                oversB: document.getElementById(`crk-oversB-${eventId}`).value,
                b1_name: document.getElementById(`crk-b1name-${eventId}`).value,
                b1_runs: Number(document.getElementById(`crk-b1runs-${eventId}`).value) || 0,
                b1_balls: Number(document.getElementById(`crk-b1balls-${eventId}`).value) || 0,
                b1_fours: Number(document.getElementById(`crk-b1fours-${eventId}`).value) || 0,
                b1_sixes: Number(document.getElementById(`crk-b1sixes-${eventId}`).value) || 0,
                b2_name: document.getElementById(`crk-b2name-${eventId}`).value,
                b2_runs: Number(document.getElementById(`crk-b2runs-${eventId}`).value) || 0,
                b2_balls: Number(document.getElementById(`crk-b2balls-${eventId}`).value) || 0,
                b2_fours: Number(document.getElementById(`crk-b2fours-${eventId}`).value) || 0,
                b2_sixes: Number(document.getElementById(`crk-b2sixes-${eventId}`).value) || 0,
                bw_name: document.getElementById(`crk-bwname-${eventId}`).value,
                bw_overs: document.getElementById(`crk-bwovers-${eventId}`).value,
                bw_runs: Number(document.getElementById(`crk-bwruns-${eventId}`).value) || 0,
                bw_wickets: Number(document.getElementById(`crk-bwwkts-${eventId}`).value) || 0,
                recentBalls: document.getElementById(`crk-recent-${eventId}`).value,
                equation: document.getElementById(`crk-equation-${eventId}`).value,
                status: document.getElementById(`crk-status-${eventId}`).value,
                winner: document.getElementById(`crk-win-${eventId}`).value
            };
        }
    },

    // FOOTBALL (Futsal / 5-a-side)
    football: {
        label: "Football (Futsal)",
        icon: "fa-futbol",
        colorClass: "teal",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-teal-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/30">
                        <i class="fa-solid fa-futbol mr-1"></i> Futsal / 5-a-Side
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-around items-center text-center">
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.teamA || 'Team A'}</p>
                        <p class="text-3xl font-black text-emerald-400 font-mono my-1">${r.scoreA || 0}</p>
                    </div>
                    <div class="text-xs text-slate-500 font-bold px-2 py-1 bg-slate-950 rounded border border-slate-800">VS</div>
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.teamB || 'Team B'}</p>
                        <p class="text-3xl font-black text-emerald-400 font-mono my-1">${r.scoreB || 0}</p>
                    </div>
                </div>
                ${r.scorers ? `<div class="text-xs text-slate-300 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60 font-mono mb-2"><i class="fa-solid fa-bullseye text-teal-400 mr-1"></i> ${r.scorers}</div>` : ''}
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-teal-400">⚽ Futsal / Football Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="fb-teamA-${e.id}" value="${r.teamA || ''}" placeholder="Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="fb-teamB-${e.id}" value="${r.teamB || ''}" placeholder="Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="fb-scoreA-${e.id}" value="${r.scoreA || 0}" placeholder="Goals A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="fb-scoreB-${e.id}" value="${r.scoreB || 0}" placeholder="Goals B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <input type="text" id="fb-scorers-${e.id}" value="${r.scorers || ''}" placeholder="Goal Scorers (e.g. Ankit 12', 28' | Rahul 19')" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="fb-status-${e.id}" value="${r.status || ''}" placeholder="Status (2nd Half - 18')" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="fb-win-${e.id}" value="${r.winner || ''}" placeholder="Winner" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-teal-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'football')" class="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Football Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "football",
            teamA: document.getElementById(`fb-teamA-${eventId}`).value,
            teamB: document.getElementById(`fb-teamB-${eventId}`).value,
            scoreA: Number(document.getElementById(`fb-scoreA-${eventId}`).value) || 0,
            scoreB: Number(document.getElementById(`fb-scoreB-${eventId}`).value) || 0,
            scorers: document.getElementById(`fb-scorers-${eventId}`).value,
            status: document.getElementById(`fb-status-${eventId}`).value,
            winner: document.getElementById(`fb-win-${eventId}`).value
        })
    },

    // BASKETBALL (3x3 Half-Court)
    basketball: {
        label: "Basketball (3x3)",
        icon: "fa-basketball",
        colorClass: "orange",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-orange-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/30">
                        <i class="fa-solid fa-basketball mr-1"></i> 3x3 Basketball
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-around items-center text-center">
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.teamA || 'Team A'}</p>
                        <p class="text-3xl font-black text-orange-400 font-mono my-1">${r.scoreA || 0}</p>
                        <span class="text-[10px] text-slate-400">Fouls: ${r.foulsA || 0}</span>
                    </div>
                    <div class="text-xs text-slate-500 font-bold px-2 py-1 bg-slate-950 rounded border border-slate-800">VS</div>
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.teamB || 'Team B'}</p>
                        <p class="text-3xl font-black text-orange-400 font-mono my-1">${r.scoreB || 0}</p>
                        <span class="text-[10px] text-slate-400">Fouls: ${r.foulsB || 0}</span>
                    </div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-orange-400">🏀 3x3 Basketball Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="bb-teamA-${e.id}" value="${r.teamA || ''}" placeholder="Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="bb-teamB-${e.id}" value="${r.teamB || ''}" placeholder="Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bb-scoreA-${e.id}" value="${r.scoreA || 0}" placeholder="Points A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bb-scoreB-${e.id}" value="${r.scoreB || 0}" placeholder="Points B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bb-foulsA-${e.id}" value="${r.foulsA || 0}" placeholder="Fouls Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bb-foulsB-${e.id}" value="${r.foulsB || 0}" placeholder="Fouls Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="bb-status-${e.id}" value="${r.status || ''}" placeholder="Time Remaining (e.g. 4:12 mins left)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="bb-win-${e.id}" value="${r.winner || ''}" placeholder="Winner" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'basketball')" class="bg-orange-500 hover:bg-orange-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Basketball Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "basketball",
            teamA: document.getElementById(`bb-teamA-${eventId}`).value,
            teamB: document.getElementById(`bb-teamB-${eventId}`).value,
            scoreA: Number(document.getElementById(`bb-scoreA-${eventId}`).value) || 0,
            scoreB: Number(document.getElementById(`bb-scoreB-${eventId}`).value) || 0,
            foulsA: Number(document.getElementById(`bb-foulsA-${eventId}`).value) || 0,
            foulsB: Number(document.getElementById(`bb-foulsB-${eventId}`).value) || 0,
            status: document.getElementById(`bb-status-${eventId}`).value,
            winner: document.getElementById(`bb-win-${eventId}`).value
        })
    },

    // VOLLEYBALL
    volleyball: {
        label: "Volleyball",
        icon: "fa-volleyball",
        colorClass: "sky",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-sky-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/30">
                        <i class="fa-solid fa-volleyball mr-1"></i> Volleyball
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div class="flex justify-between text-slate-200"><span>${r.teamA || 'Team A'}</span><span class="text-sky-400 font-bold">${r.setsA || 0} Sets</span></div>
                    <div class="flex justify-between text-slate-200"><span>${r.teamB || 'Team B'}</span><span class="text-sky-400 font-bold">${r.setsB || 0} Sets</span></div>
                    <div class="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                        <span>Current Set Points:</span>
                        <span class="text-emerald-400 font-bold">${r.currPoints || '21 - 19'}</span>
                    </div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-sky-400">🏐 Volleyball Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="vb-teamA-${e.id}" value="${r.teamA || ''}" placeholder="Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="vb-teamB-${e.id}" value="${r.teamB || ''}" placeholder="Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="vb-setsA-${e.id}" value="${r.setsA || 0}" placeholder="Sets Won Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="vb-setsB-${e.id}" value="${r.setsB || 0}" placeholder="Sets Won Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <input type="text" id="vb-pts-${e.id}" value="${r.currPoints || ''}" placeholder="Current Live Set Score (e.g. 21 - 19)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="vb-status-${e.id}" value="${r.status || ''}" placeholder="Status (Set 3 In Progress)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="vb-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Team" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'volleyball')" class="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Volleyball Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "volleyball",
            teamA: document.getElementById(`vb-teamA-${eventId}`).value,
            teamB: document.getElementById(`vb-teamB-${eventId}`).value,
            setsA: Number(document.getElementById(`vb-setsA-${eventId}`).value) || 0,
            setsB: Number(document.getElementById(`vb-setsB-${eventId}`).value) || 0,
            currPoints: document.getElementById(`vb-pts-${eventId}`).value,
            status: document.getElementById(`vb-status-${eventId}`).value,
            winner: document.getElementById(`vb-win-${eventId}`).value
        })
    },

    // ==========================================
    // 2. INDOOR & RACKET SPORTS
    // ==========================================

    // BADMINTON (Singles / Mixed Doubles)
    badminton: {
        label: "Badminton",
        icon: "fa-table-tennis-paddle-ball",
        colorClass: "emerald",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <i class="fa-solid fa-table-tennis-paddle-ball mr-1"></i> Badminton (${r.category || 'Singles/Doubles'})
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div class="flex justify-between text-slate-200"><span>${r.playerA || 'Player A'}</span><span>Set 1: <strong class="text-emerald-400">${r.set1_A || 0}</strong> | Set 2: <strong class="text-emerald-400">${r.set2_A || 0}</strong> | Set 3: <strong class="text-emerald-400">${r.set3_A || 0}</strong></span></div>
                    <div class="flex justify-between text-slate-200"><span>${r.playerB || 'Player B'}</span><span>Set 1: <strong class="text-emerald-400">${r.set1_B || 0}</strong> | Set 2: <strong class="text-emerald-400">${r.set2_B || 0}</strong> | Set 3: <strong class="text-emerald-400">${r.set3_B || 0}</strong></span></div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-emerald-400">🏸 Badminton Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="bad-pA-${e.id}" value="${r.playerA || ''}" placeholder="Player/Pair A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="bad-pB-${e.id}" value="${r.playerB || ''}" placeholder="Player/Pair B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <input type="text" id="bad-s1-${e.id}" value="${r.set1_A && r.set1_B ? r.set1_A + '-' + r.set1_B : ''}" placeholder="Set 1 (21-18)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="bad-s2-${e.id}" value="${r.set2_A && r.set2_B ? r.set2_A + '-' + r.set2_B : ''}" placeholder="Set 2 (19-21)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="bad-s3-${e.id}" value="${r.set3_A && r.set3_B ? r.set3_A + '-' + r.set3_B : ''}" placeholder="Set 3 (21-15)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="bad-status-${e.id}" value="${r.status || ''}" placeholder="Status (e.g. Match Point)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="bad-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'badminton')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Badminton Score</button>
            </div>`,
        extractData: (eventId) => {
            const s1 = (document.getElementById(`bad-s1-${eventId}`).value || "").split("-");
            const s2 = (document.getElementById(`bad-s2-${eventId}`).value || "").split("-");
            const s3 = (document.getElementById(`bad-s3-${eventId}`).value || "").split("-");
            return {
                sportType: "badminton",
                playerA: document.getElementById(`bad-pA-${eventId}`).value,
                playerB: document.getElementById(`bad-pB-${eventId}`).value,
                set1_A: s1[0] || 0, set1_B: s1[1] || 0,
                set2_A: s2[0] || 0, set2_B: s2[1] || 0,
                set3_A: s3[0] || 0, set3_B: s3[1] || 0,
                status: document.getElementById(`bad-status-${eventId}`).value,
                winner: document.getElementById(`bad-win-${eventId}`).value
            };
        }
    },

    // TABLE TENNIS
    table_tennis: {
        label: "Table Tennis",
        icon: "fa-table-tennis-paddle-ball",
        colorClass: "cyan",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-cyan-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                        <i class="fa-solid fa-table-tennis-paddle-ball mr-1"></i> Table Tennis
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs font-mono">
                    <div>
                        <p class="font-bold text-slate-200">${r.playerA || 'Player A'}</p>
                        <p class="font-bold text-slate-200 mt-1">${r.playerB || 'Player B'}</p>
                    </div>
                    <div class="text-right">
                        <p class="text-cyan-400 font-bold">${r.gamesA || 0} Games</p>
                        <p class="text-cyan-400 font-bold mt-1">${r.gamesB || 0} Games</p>
                    </div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-cyan-400">🏓 Table Tennis Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="tt-pA-${e.id}" value="${r.playerA || ''}" placeholder="Player A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="tt-pB-${e.id}" value="${r.playerB || ''}" placeholder="Player B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="tt-gA-${e.id}" value="${r.gamesA || 0}" placeholder="Games Won A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="tt-gB-${e.id}" value="${r.gamesB || 0}" placeholder="Games Won B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="tt-status-${e.id}" value="${r.status || ''}" placeholder="Status (Best of 5)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="tt-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'table_tennis')" class="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update TT Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "table_tennis",
            playerA: document.getElementById(`tt-pA-${eventId}`).value,
            playerB: document.getElementById(`tt-pB-${eventId}`).value,
            gamesA: Number(document.getElementById(`tt-gA-${eventId}`).value) || 0,
            gamesB: Number(document.getElementById(`tt-gB-${eventId}`).value) || 0,
            status: document.getElementById(`tt-status-${eventId}`).value,
            winner: document.getElementById(`tt-win-${eventId}`).value
        })
    },

    // CHESS
    chess: {
        label: "Chess",
        icon: "fa-chess",
        colorClass: "purple",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-purple-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30">
                        <i class="fa-solid fa-chess mr-1"></i> Blitz / Classical Chess
                    </span>
                    <span class="text-xs font-mono text-purple-300 font-bold">${r.boardNo || 'Board #1'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs font-mono">
                    <div class="flex justify-between text-slate-200"><span>⚪ White: <strong>${r.white || '-'}</strong></span></div>
                    <div class="flex justify-between text-slate-200"><span>⚫ Black: <strong>${r.black || '-'}</strong></span></div>
                    <p class="text-[11px] text-slate-400 pt-1 border-t border-slate-800">${r.moves || '3+2 Blitz Time Control'}</p>
                </div>
                ${r.result ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-crown text-amber-400 mr-1"></i> Result: ${r.result}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-purple-400">♟️ Chess Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="chs-w-${e.id}" value="${r.white || ''}" placeholder="White Player Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="chs-b-${e.id}" value="${r.black || ''}" placeholder="Black Player Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <input type="text" id="chs-board-${e.id}" value="${r.boardNo || ''}" placeholder="Board / Round (e.g. Board #1 - Semi Finals)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                <input type="text" id="chs-moves-${e.id}" value="${r.moves || ''}" placeholder="Moves / PGN Notes (e.g. 42 Moves Sicilian Defense)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                <input type="text" id="chs-res-${e.id}" value="${r.result || ''}" placeholder="Result (e.g. 1-0 White Won or 1/2-1/2 Draw)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                <button onclick="saveSportScore('${e.id}', 'chess')" class="bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Chess Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "chess",
            white: document.getElementById(`chs-w-${eventId}`).value,
            black: document.getElementById(`chs-b-${eventId}`).value,
            boardNo: document.getElementById(`chs-board-${eventId}`).value,
            moves: document.getElementById(`chs-moves-${eventId}`).value,
            result: document.getElementById(`chs-res-${eventId}`).value
        })
    },

    // POWERLIFTING
    powerlifting: {
        label: "Powerlifting",
        icon: "fa-dumbbell",
        colorClass: "rose",
        renderCard: (e, r) => {
            const total = (Number(r.squat) || 0) + (Number(r.bench) || 0) + (Number(r.deadlift) || 0);
            return `
            <div class="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/30">
                        <i class="fa-solid fa-dumbbell mr-1"></i> Powerlifting (${r.weightClass || 'Open'})
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Final Standings'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <div class="flex justify-between text-slate-300"><span>Squat:</span><strong class="font-mono text-rose-400">${r.squat || 0} kg</strong></div>
                    <div class="flex justify-between text-slate-300"><span>Bench Press:</span><strong class="font-mono text-rose-400">${r.bench || 0} kg</strong></div>
                    <div class="flex justify-between text-slate-300"><span>Deadlift:</span><strong class="font-mono text-rose-400">${r.deadlift || 0} kg</strong></div>
                    <div class="pt-1 border-t border-slate-800 flex justify-between font-bold text-slate-100">
                        <span>Total Lifted:</span>
                        <span class="font-mono text-emerald-400 text-sm">${total} kg</span>
                    </div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Gold Medalist: ${r.winner}</p>` : ''}
            </div>`;
        },
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-rose-400">🏋️ Powerlifting Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="pw-lifter-${e.id}" value="${r.winner || ''}" placeholder="Lifter Name / Winner" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="pw-class-${e.id}" value="${r.weightClass || ''}" placeholder="Weight Category (-74 kg)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-3 gap-2">
                    <input type="number" id="pw-sq-${e.id}" value="${r.squat || 0}" placeholder="Squat Best (kg)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="pw-bp-${e.id}" value="${r.bench || 0}" placeholder="Bench Best (kg)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="pw-dl-${e.id}" value="${r.deadlift || 0}" placeholder="Deadlift Best (kg)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <input type="text" id="pw-status-${e.id}" value="${r.status || ''}" placeholder="Status (e.g. Flight A Complete)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                <button onclick="saveSportScore('${e.id}', 'powerlifting')" class="bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Powerlifting Record</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "powerlifting",
            winner: document.getElementById(`pw-lifter-${eventId}`).value,
            weightClass: document.getElementById(`pw-class-${eventId}`).value,
            squat: Number(document.getElementById(`pw-sq-${eventId}`).value) || 0,
            bench: Number(document.getElementById(`pw-bp-${eventId}`).value) || 0,
            deadlift: Number(document.getElementById(`pw-dl-${eventId}`).value) || 0,
            status: document.getElementById(`pw-status-${eventId}`).value
        })
    },

    // ARM WRESTLING
    arm_wrestling: {
        label: "Arm Wrestling",
        icon: "fa-handshake-simple",
        colorClass: "indigo",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-indigo-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30">
                        <i class="fa-solid fa-handshake-simple mr-1"></i> Arm Wrestling (${r.category || 'Right Hand'})
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 flex justify-around items-center text-center text-xs">
                    <div><p class="font-bold text-slate-200">${r.fighterA || 'Puller A'}</p><p class="text-xl font-mono text-indigo-400 font-bold mt-1">${r.scoreA || 0}</p></div>
                    <span class="text-slate-500 font-bold">VS</span>
                    <div><p class="font-bold text-slate-200">${r.fighterB || 'Puller B'}</p><p class="text-xl font-mono text-indigo-400 font-bold mt-1">${r.scoreB || 0}</p></div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-indigo-400">💪 Arm Wrestling Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="arm-fA-${e.id}" value="${r.fighterA || ''}" placeholder="Puller A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="arm-fB-${e.id}" value="${r.fighterB || ''}" placeholder="Puller B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="arm-scA-${e.id}" value="${r.scoreA || 0}" placeholder="Pins A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="arm-scB-${e.id}" value="${r.scoreB || 0}" placeholder="Pins B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="arm-cat-${e.id}" value="${r.category || ''}" placeholder="Category (e.g. Right Hand -80kg)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="arm-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'arm_wrestling')" class="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Arm Wrestling Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "arm_wrestling",
            fighterA: document.getElementById(`arm-fA-${eventId}`).value,
            fighterB: document.getElementById(`arm-fB-${eventId}`).value,
            scoreA: Number(document.getElementById(`arm-scA-${eventId}`).value) || 0,
            scoreB: Number(document.getElementById(`arm-scB-${eventId}`).value) || 0,
            category: document.getElementById(`arm-cat-${eventId}`).value,
            winner: document.getElementById(`arm-win-${eventId}`).value
        })
    },

    // ==========================================
    // 3. ESPORTS & GAMING
    // ==========================================

    // VALORANT / CS2 (PC)
    valorant_cs: {
        label: "Valorant / Counter-Strike 2 (PC)",
        icon: "fa-crosshairs",
        colorClass: "violet",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-violet-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/30">
                        <i class="fa-solid fa-crosshairs mr-1"></i> Tactical Shooter (PC)
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.mapName || 'Map'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-around items-center text-center">
                    <div><p class="text-xs font-bold text-slate-200">${r.teamA || 'Team A'}</p><p class="text-2xl font-black text-violet-400 font-mono">${r.roundsA || 0}</p></div>
                    <span class="text-xs text-slate-500 font-bold">VS</span>
                    <div><p class="text-xs font-bold text-slate-200">${r.teamB || 'Team B'}</p><p class="text-2xl font-black text-violet-400 font-mono">${r.roundsB || 0}</p></div>
                </div>
                ${r.mvp ? `<p class="text-xs text-violet-300 font-mono bg-violet-950/40 p-1.5 rounded border border-violet-800/40 mb-2"><i class="fa-solid fa-crown mr-1"></i> Match MVP: ${r.mvp}</p>` : ''}
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-violet-400">🎯 Valorant / CS2 Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="vcs-tA-${e.id}" value="${r.teamA || ''}" placeholder="Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="vcs-tB-${e.id}" value="${r.teamB || ''}" placeholder="Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="vcs-rA-${e.id}" value="${r.roundsA || 0}" placeholder="Rounds Won A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="vcs-rB-${e.id}" value="${r.roundsB || 0}" placeholder="Rounds Won B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="vcs-map-${e.id}" value="${r.mapName || ''}" placeholder="Map Played (Ascent / Mirage)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="vcs-mvp-${e.id}" value="${r.mvp || ''}" placeholder="Match MVP (K/D/A)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <input type="text" id="vcs-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Team" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                <button onclick="saveSportScore('${e.id}', 'valorant_cs')" class="bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update PC Esports Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "valorant_cs",
            teamA: document.getElementById(`vcs-tA-${eventId}`).value,
            teamB: document.getElementById(`vcs-tB-${eventId}`).value,
            roundsA: Number(document.getElementById(`vcs-rA-${eventId}`).value) || 0,
            roundsB: Number(document.getElementById(`vcs-rB-${eventId}`).value) || 0,
            mapName: document.getElementById(`vcs-map-${eventId}`).value,
            mvp: document.getElementById(`vcs-mvp-${eventId}`).value,
            winner: document.getElementById(`vcs-win-${eventId}`).value
        })
    },

    // BGMI (Mobile Battle Royale)
    bgmi: {
        label: "BGMI (Mobile)",
        icon: "fa-mobile-screen-button",
        colorClass: "yellow",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-yellow-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-yellow-400 bg-yellow-500/10 px-2.5 py-1 rounded-full border border-yellow-500/30">
                        <i class="fa-solid fa-mobile-screen-button mr-1"></i> BGMI Squads (${r.mapName || 'Erangel'})
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Match Complete'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                
                <div class="my-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <div class="flex justify-between items-center text-amber-300 font-bold border-b border-slate-800 pb-1">
                        <span>🍗 WWCD #1: ${r.top1_team || 'Team Winner'}</span>
                        <span class="font-mono">${r.top1_pts || 0} pts (${r.top1_kills || 0} kills)</span>
                    </div>
                    <div class="flex justify-between items-center text-slate-300 pt-1">
                        <span>🥈 #2: ${r.top2_team || 'Team 2'}</span>
                        <span class="font-mono text-slate-400">${r.top2_pts || 0} pts</span>
                    </div>
                    <div class="flex justify-between items-center text-slate-400">
                        <span>🥉 #3: ${r.top3_team || 'Team 3'}</span>
                        <span class="font-mono">${r.top3_pts || 0} pts</span>
                    </div>
                </div>
                ${r.mvp ? `<p class="text-xs text-yellow-300 font-semibold"><i class="fa-solid fa-star text-amber-400 mr-1"></i> Tournament MVP: ${r.mvp}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-yellow-400">📱 BGMI Leaderboard Manager: ${e.title}</h4>
                <div class="grid grid-cols-3 gap-1.5">
                    <input type="text" id="bgm-t1-${e.id}" value="${r.top1_team || ''}" placeholder="🍗 WWCD Team" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bgm-p1-${e.id}" value="${r.top1_pts || 0}" placeholder="Total Pts" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bgm-k1-${e.id}" value="${r.top1_kills || 0}" placeholder="Kills" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-1.5">
                    <input type="text" id="bgm-t2-${e.id}" value="${r.top2_team || ''}" placeholder="#2 Team Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bgm-p2-${e.id}" value="${r.top2_pts || 0}" placeholder="#2 Total Pts" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-1.5">
                    <input type="text" id="bgm-t3-${e.id}" value="${r.top3_team || ''}" placeholder="#3 Team Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="bgm-p3-${e.id}" value="${r.top3_pts || 0}" placeholder="#3 Total Pts" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="bgm-map-${e.id}" value="${r.mapName || ''}" placeholder="Map (Erangel/Miramar)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="bgm-mvp-${e.id}" value="${r.mvp || ''}" placeholder="Top Fragger MVP" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-yellow-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'bgmi')" class="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update BGMI Standings</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "bgmi",
            top1_team: document.getElementById(`bgm-t1-${eventId}`).value,
            top1_pts: Number(document.getElementById(`bgm-p1-${eventId}`).value) || 0,
            top1_kills: Number(document.getElementById(`bgm-k1-${eventId}`).value) || 0,
            top2_team: document.getElementById(`bgm-t2-${eventId}`).value,
            top2_pts: Number(document.getElementById(`bgm-p2-${eventId}`).value) || 0,
            top3_team: document.getElementById(`bgm-t3-${eventId}`).value,
            top3_pts: Number(document.getElementById(`bgm-p3-${eventId}`).value) || 0,
            mapName: document.getElementById(`bgm-map-${eventId}`).value,
            mvp: document.getElementById(`bgm-mvp-${eventId}`).value
        })
    },

    // CALL OF DUTY MOBILE (COD)
    cod: {
        label: "Call of Duty (COD Mobile)",
        icon: "fa-headset",
        colorClass: "emerald",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-emerald-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <i class="fa-solid fa-headset mr-1"></i> COD Mobile (${r.mode || 'Hardpoint'})
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-around items-center text-center">
                    <div><p class="text-xs font-bold text-slate-200">${r.teamA || 'Team A'}</p><p class="text-2xl font-black text-emerald-400 font-mono">${r.scoreA || 0}</p></div>
                    <span class="text-xs text-slate-500 font-bold">VS</span>
                    <div><p class="text-xs font-bold text-slate-200">${r.teamB || 'Team B'}</p><p class="text-2xl font-black text-emerald-400 font-mono">${r.scoreB || 0}</p></div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-emerald-400">🎧 COD Mobile Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="cod-tA-${e.id}" value="${r.teamA || ''}" placeholder="Team A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="cod-tB-${e.id}" value="${r.teamB || ''}" placeholder="Team B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="cod-scA-${e.id}" value="${r.scoreA || 0}" placeholder="Points A (e.g. 250)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="cod-scB-${e.id}" value="${r.scoreB || 0}" placeholder="Points B (e.g. 210)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="cod-mode-${e.id}" value="${r.mode || ''}" placeholder="Mode (Hardpoint / Search & Destroy)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="cod-win-${e.id}" value="${r.winner || ''}" placeholder="Winner" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'cod')" class="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update COD Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "cod",
            teamA: document.getElementById(`cod-tA-${eventId}`).value,
            teamB: document.getElementById(`cod-tB-${eventId}`).value,
            scoreA: Number(document.getElementById(`cod-scA-${eventId}`).value) || 0,
            scoreB: Number(document.getElementById(`cod-scB-${eventId}`).value) || 0,
            mode: document.getElementById(`cod-mode-${eventId}`).value,
            winner: document.getElementById(`cod-win-${eventId}`).value
        })
    },

    // EA SPORTS FC / FIFA (Console)
    fifa: {
        label: "EA Sports FC / FIFA (Console)",
        icon: "fa-gamepad",
        colorClass: "blue",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-blue-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/30">
                        <i class="fa-solid fa-gamepad mr-1"></i> FIFA / EA FC 26
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-around items-center text-center">
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.playerA || 'Player A'}</p>
                        <p class="text-[10px] text-slate-400">(${r.clubA || 'Real Madrid'})</p>
                        <p class="text-3xl font-black text-blue-400 font-mono mt-1">${r.scoreA || 0}</p>
                    </div>
                    <span class="text-xs text-slate-500 font-bold">VS</span>
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.playerB || 'Player B'}</p>
                        <p class="text-[10px] text-slate-400">(${r.clubB || 'Man City'})</p>
                        <p class="text-3xl font-black text-blue-400 font-mono mt-1">${r.scoreB || 0}</p>
                    </div>
                </div>
                ${r.penalties ? `<p class="text-xs text-slate-300 font-mono text-center bg-slate-900 p-1 rounded border border-slate-800 mb-2">Penalties: ${r.penalties}</p>` : ''}
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-blue-400">🎮 FIFA Console Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="fif-pA-${e.id}" value="${r.playerA || ''}" placeholder="Player A Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="fif-pB-${e.id}" value="${r.playerB || ''}" placeholder="Player B Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="fif-cA-${e.id}" value="${r.clubA || ''}" placeholder="Club A (Real Madrid)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="fif-cB-${e.id}" value="${r.clubB || ''}" placeholder="Club B (Man City)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="fif-sA-${e.id}" value="${r.scoreA || 0}" placeholder="Score A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="fif-sB-${e.id}" value="${r.scoreB || 0}" placeholder="Score B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <input type="text" id="fif-pen-${e.id}" value="${r.penalties || ''}" placeholder="Penalties (if tied e.g. 4-2 pens)" class="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1">
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="fif-status-${e.id}" value="${r.status || ''}" placeholder="Status (e.g. Full Time)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="fif-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'fifa')" class="bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update FIFA Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "fifa",
            playerA: document.getElementById(`fif-pA-${eventId}`).value,
            playerB: document.getElementById(`fif-pB-${eventId}`).value,
            clubA: document.getElementById(`fif-cA-${eventId}`).value,
            clubB: document.getElementById(`fif-cB-${eventId}`).value,
            scoreA: Number(document.getElementById(`fif-sA-${eventId}`).value) || 0,
            scoreB: Number(document.getElementById(`fif-sB-${eventId}`).value) || 0,
            penalties: document.getElementById(`fif-pen-${eventId}`).value,
            status: document.getElementById(`fif-status-${eventId}`).value,
            winner: document.getElementById(`fif-win-${eventId}`).value
        })
    },

    // TEKKEN / STREET FIGHTER (Console Fighting Games)
    fighting_games: {
        label: "Tekken / Street Fighter",
        icon: "fa-hand-fist",
        colorClass: "fuchsia",
        renderCard: (e, r) => `
            <div class="glass-panel p-5 rounded-2xl border border-fuchsia-500/30 bg-slate-950/90 shadow-xl">
                <div class="flex justify-between items-center mb-3">
                    <span class="text-[10px] font-black uppercase text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-1 rounded-full border border-fuchsia-500/30">
                        <i class="fa-solid fa-hand-fist mr-1"></i> ${r.gameName || 'Tekken 8'}
                    </span>
                    <span class="text-xs font-mono text-emerald-400 font-bold">${r.status || 'Live'}</span>
                </div>
                <h3 class="text-base font-bold text-slate-100">${e.title}</h3>
                <div class="my-3 bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex justify-around items-center text-center">
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.playerA || 'Player A'}</p>
                        <p class="text-[10px] text-fuchsia-400 font-mono">(${r.charA || 'Jin'})</p>
                        <p class="text-3xl font-black text-fuchsia-400 font-mono mt-1">${r.gamesA || 0}</p>
                    </div>
                    <span class="text-xs text-slate-500 font-bold">VS</span>
                    <div>
                        <p class="text-xs font-bold text-slate-200">${r.playerB || 'Player B'}</p>
                        <p class="text-[10px] text-fuchsia-400 font-mono">(${r.charB || 'Kazuya'})</p>
                        <p class="text-3xl font-black text-fuchsia-400 font-mono mt-1">${r.gamesB || 0}</p>
                    </div>
                </div>
                ${r.winner ? `<p class="text-xs text-amber-300 font-bold"><i class="fa-solid fa-trophy mr-1"></i> Winner: ${r.winner}</p>` : ''}
            </div>`,
        renderForm: (e, r) => `
            <div class="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2 text-xs">
                <h4 class="font-bold text-fuchsia-400">🥊 Fighting Game Manager: ${e.title}</h4>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="ft-pA-${e.id}" value="${r.playerA || ''}" placeholder="Player A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="ft-pB-${e.id}" value="${r.playerB || ''}" placeholder="Player B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="ft-cA-${e.id}" value="${r.charA || ''}" placeholder="Character A (Jin)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="ft-cB-${e.id}" value="${r.charB || ''}" placeholder="Character B (Kazuya)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="ft-gA-${e.id}" value="${r.gamesA || 0}" placeholder="Games Won A" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="number" id="ft-gB-${e.id}" value="${r.gamesB || 0}" placeholder="Games Won B" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                </div>
                <div class="grid grid-cols-2 gap-2">
                    <input type="text" id="ft-game-${e.id}" value="${r.gameName || ''}" placeholder="Game (Tekken 8 / Street Fighter 6)" class="bg-slate-950 border border-slate-800 rounded px-2 py-1">
                    <input type="text" id="ft-win-${e.id}" value="${r.winner || ''}" placeholder="Winner Name" class="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-amber-300">
                </div>
                <button onclick="saveSportScore('${e.id}', 'fighting_games')" class="bg-fuchsia-500 hover:bg-fuchsia-400 text-slate-950 font-bold px-3 py-1.5 rounded-xl w-full">Update Fighting Game Score</button>
            </div>`,
        extractData: (eventId) => ({
            sportType: "fighting_games",
            playerA: document.getElementById(`ft-pA-${eventId}`).value,
            playerB: document.getElementById(`ft-pB-${eventId}`).value,
            charA: document.getElementById(`ft-cA-${eventId}`).value,
            charB: document.getElementById(`ft-cB-${eventId}`).value,
            gamesA: Number(document.getElementById(`ft-gA-${eventId}`).value) || 0,
            gamesB: Number(document.getElementById(`ft-gB-${eventId}`).value) || 0,
            gameName: document.getElementById(`ft-game-${eventId}`).value,
            winner: document.getElementById(`ft-win-${eventId}`).value
        })
    }
};

/**
 * Universal Global Callers for HTML Application Interface
 */
function renderSportCardModular(event) {
    const type = event.sportType || "none";
    if (SportsRegistry[type] && SportsRegistry[type].renderCard) {
        return SportsRegistry[type].renderCard(event, event.results || {});
    }
    // General Fallback
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
