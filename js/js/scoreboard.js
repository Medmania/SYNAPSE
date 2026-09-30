const esportsData = [
    { rank: 1, team: "Team Headshrinkers (UCMS)", kills: 28, pts: 42, color: "text-amber-400" },
    { rank: 2, team: "MAMC Strikers", kills: 22, pts: 34, color: "text-slate-300" },
    { rank: 3, team: "VMMCX Gaming", kills: 18, pts: 26, color: "text-slate-400" }
];

function renderEsports() {
    const container = document.getElementById("esports-list");
    if (!container) { return; }
    container.innerHTML = "";
    esportsData.forEach(item => {
        container.innerHTML += `<div class="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center"><div class="flex items-center space-x-3"><span class="w-6 h-6 rounded-full bg-slate-800 ${item.color} font-bold text-xs flex items-center justify-center">${item.rank}</span><div><p class="text-sm font-bold text-white">${item.team}</p><p class="text-[11px] text-slate-400">Kills: ${item.kills}</p></div></div><span class="text-emerald-400 font-bold text-sm">${item.pts} Pts</span></div>`;
    });
}
