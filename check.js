
(()=>{
'use strict';
const $=id=>document.getElementById(id);const screens=['home','lobby','app','result'];
let ws=null,isHost=false,myId='',roomCode='',myName='',hostConn=null,connections=new Map(),state=null,view='game',activeCat='All',activeDiff='All';
const cats=['Cooking','Cleaning','Studying','Health','Productivity'];
const bosses={
  chaos:{name:'THE CHAOS DRAGON',subtitle:'ANCIENT • WORLD BOSS • PARTY ENCOUNTER',emoji:'🐉',maxHp:2000,rewardXp:150,rewardEnergy:25,desc:'The beginning of your journey. Master the party system before the real pressure begins.',moves:[
    {name:'Chaos Claw',icon:'🦴',kind:'damage',damage:28,desc:'A brutal swipe at one hero.'},{name:'Flame Breath',icon:'🔥',kind:'aoe',damage:18,desc:'Burns the entire party.'},{name:'Chaos Roar',icon:'📢',kind:'buff',damage:0,desc:'The dragon grows enraged, increasing its next attack.'}],
    phase2Moves:[{name:'Inferno Breath',icon:'🌋',kind:'aoe',damage:28,desc:'A superheated blast that scorches the whole party.'},{name:'Reality Tear',icon:'🕳️',kind:'damage',damage:52,desc:'A rift tears through one hero.'}],
    phase3Moves:[{name:'Cataclysm',icon:'☄️',kind:'aoe',damage:40,desc:'The dragon unleashes a catastrophic blast.'},{name:'Worldbreaker',icon:'💀',kind:'double',damage:30,desc:'Two devastating strikes against one hero.'}]},
  procrastinator:{name:'THE PROCRASTINATOR',subtitle:'TIME THIEF • WORLD BOSS • PARTY ENCOUNTER',emoji:'🧟',maxHp:2400,rewardXp:225,rewardEnergy:35,desc:'Tomorrow always looks easier. This boss punishes parties that waste too many turns.',moves:[
    {name:'Delay Tactics',icon:'⏳',kind:'damage',damage:24,desc:'Slows one hero and steals energy.'},{name:'Deadline Slam',icon:'💥',kind:'damage',damage:38,desc:'A crushing blow.'},{name:'Put It Off',icon:'😴',kind:'heal',damage:0,heal:100,desc:'Heals itself instead of attacking.'}],
    phase2Moves:[{name:'Time Tax',icon:'💸',kind:'drain',damage:22,desc:'Punishes one hero and steals energy.'},{name:'Last Minute Slam',icon:'⏰',kind:'damage',damage:55,desc:'A crushing attack fueled by panic.'}],
    phase3Moves:[{name:'Never Enough Time',icon:'⌛',kind:'double',damage:30,desc:'Two frantic attacks against one hero.'},{name:'Deadline Reset',icon:'🔄',kind:'heal',damage:0,heal:180,desc:'The procrastinator buys itself more time.'}]},
  overthinker:{name:'THE OVERTHINKING OVERLORD',subtitle:'MIND EATER • WORLD BOSS • PARTY ENCOUNTER',emoji:'🧠',maxHp:2800,rewardXp:325,rewardEnergy:50,desc:'Every decision becomes a spiral. Stay focused and keep the party moving.',moves:[
    {name:'Mind Spiral',icon:'🌀',kind:'damage',damage:30,desc:'Deals heavy mental damage.'},{name:'Confusion',icon:'❓',kind:'drain',damage:16,desc:'Hurts one hero and drains energy.'},{name:'Analyze',icon:'🔍',kind:'buff',damage:0,desc:'Studies the party and empowers its next hit.'}],
    phase2Moves:[{name:'Recursive Spiral',icon:'🌀',kind:'damage',damage:48,desc:'A looping thought strikes one hero repeatedly.'},{name:'Paralyzing Doubt',icon:'🫥',kind:'drain',damage:24,desc:'Deals damage and drains energy.'}],
    phase3Moves:[{name:'Mental Collapse',icon:'🧠',kind:'aoe',damage:28,desc:'The boss overloads every hero with thoughts.'},{name:'Perfect Analysis',icon:'📐',kind:'buff',damage:0,desc:'Its next attack becomes massively empowered.'}]},
  deadline:{name:'THE DEADLINE DEMON',subtitle:'TIME PRESSURE • WORLD BOSS • PARTY ENCOUNTER',emoji:'👹',maxHp:3200,rewardXp:450,rewardEnergy:70,desc:'The clock is always ticking. Survive the pressure and hit hard before time runs out.',moves:[
    {name:'Clock Strike',icon:'🕰️',kind:'damage',damage:35,desc:'A fast strike against one hero.'},{name:'Panic Wave',icon:'😱',kind:'aoe',damage:15,desc:'Hits every hero.'},{name:'Rush Hour',icon:'⚡',kind:'double',damage:20,desc:'Attacks the same hero twice.'}],
    phase2Moves:[{name:'Countdown Strike',icon:'🔔',kind:'damage',damage:50,desc:'A heavy hit as the clock races down.'},{name:'Overtime Rush',icon:'🏃',kind:'double',damage:28,desc:'Two rapid strikes against one hero.'}],
    phase3Moves:[{name:'Final Hour',icon:'🌑',kind:'aoe',damage:30,desc:'The final countdown damages the entire party.'},{name:'Doomsday Clock',icon:'☠️',kind:'damage',damage:65,desc:'A devastating final-hour attack.'}]},
  jobhunter:{name:'THE REJECTION REAPER',subtitle:'JOB HUNT • CAREER NIGHTMARE • WORLD BOSS',emoji:'📄',maxHp:3600,rewardXp:600,rewardEnergy:90,desc:'Applications, ghosting, interviews, and rejection letters. Keep applying.',moves:[
    {name:'ATS Scanner',icon:'🤖',kind:'damage',damage:42,desc:'An automated resume scanner targets one hero.'},{name:'Ghosted',icon:'👻',kind:'drain',damage:20,desc:'The reaper ghosts one hero and drains their energy.'},{name:'Awkward Interview',icon:'💼',kind:'aoe',damage:14,desc:'A brutal interview question rattles the entire party.'}],
    phase2Moves:[{name:'Resume Rejection',icon:'❌',kind:'damage',damage:62,desc:'A rejection letter hits one hero with crushing force.'},{name:'Salary Negotiation',icon:'💰',kind:'buff',damage:0,desc:'The reaper negotiates a stronger next attack.'}],
    phase3Moves:[{name:'Final Interview',icon:'🎤',kind:'double',damage:42,desc:'Two rapid interview attacks against one hero.'},{name:'Offer Rescinded',icon:'📬',kind:'aoe',damage:38,desc:'A devastating party-wide career setback.'},{name:'Hiring Freeze',icon:'🧊',kind:'buff',damage:0,desc:'The reaper enters a terrifying final phase and empowers itself.'}]},
  doomscroller:{name:'THE DOOMSCROLLER',subtitle:'ATTENTION THIEF • DIGITAL NIGHTMARE • WORLD BOSS',emoji:'📱',maxHp:4200,rewardXp:700,rewardEnergy:100,desc:'One more video. One more notification. One more hour disappears.',moves:[
    {name:'Infinite Scroll',icon:'📱',kind:'drain',damage:26,desc:'Drains a hero’s HP and combat energy.'},{name:'Notification Bomb',icon:'🔔',kind:'aoe',damage:18,desc:'A barrage of notifications distracts the entire party.'},{name:'Clickbait Strike',icon:'🪤',kind:'damage',damage:40,desc:'A tempting headline hides a nasty hit.'}],
    phase2Moves:[{name:'FOMO Surge',icon:'👀',kind:'drain',damage:32,desc:'Fear of missing out drains even more energy.'},{name:'Autoplay',icon:'▶️',kind:'double',damage:28,desc:'The feed refuses to stop and attacks twice.'}],
    phase3Moves:[{name:'Total Addiction',icon:'♾️',kind:'aoe',damage:36,desc:'The feed overwhelms the entire party.'},{name:'Lost Evening',icon:'🌙',kind:'damage',damage:72,desc:'An entire evening vanishes in one devastating hit.'},{name:'Endless Feed',icon:'🔄',kind:'heal',damage:0,heal:220,desc:'The algorithm refreshes itself and regains strength.'}]},
  comfort:{name:'THE COMFORT ZONE',subtitle:'STAGNATION • FEAR OF CHANGE • WORLD BOSS',emoji:'🛋️',maxHp:5000,rewardXp:800,rewardEnergy:115,desc:'It is safe here. It is familiar here. It is also where your growth stops.',moves:[
    {name:'Cozy Trap',icon:'🛋️',kind:'damage',damage:34,desc:'A soft trap catches one hero off guard.'},{name:'Comfort Drain',icon:'😌',kind:'drain',damage:22,desc:'Drains energy by making the easy choice irresistible.'},{name:'Stagnation',icon:'🧊',kind:'buff',damage:0,desc:'The boss settles in and empowers its next attack.'}],
    phase2Moves:[{name:'Challenge Wall',icon:'🧱',kind:'damage',damage:58,desc:'Fear of a challenge hits one hero hard.'},{name:'Fear of Failure',icon:'😨',kind:'drain',damage:30,desc:'Doubt drains HP and energy.'}],
    phase3Moves:[{name:'Opportunity Cost',icon:'⏳',kind:'double',damage:38,desc:'Two attacks remind the party what staying still costs.'},{name:'Safe but Stuck',icon:'🔒',kind:'aoe',damage:34,desc:'The whole party feels the cost of never changing.'},{name:'Stay Comfortable',icon:'🛋️',kind:'heal',damage:0,heal:240,desc:'The zone restores itself by convincing the party not to push.'}]},
  debt:{name:'THE DEBT DRAGON',subtitle:'FINANCIAL PRESSURE • INTEREST MONSTER • WORLD BOSS',emoji:'🐲',maxHp:5800,rewardXp:900,rewardEnergy:130,desc:'The longer the fight lasts, the more interest it collects.',moves:[
    {name:'Interest Claw',icon:'💰',kind:'damage',damage:45,desc:'A direct hit backed by compounding pressure.'},{name:'Debt Avalanche',icon:'🏦',kind:'aoe',damage:20,desc:'Bills pile onto the entire party.'},{name:'Financial Drain',icon:'💳',kind:'drain',damage:26,desc:'Steals HP and combat energy.'}],
    phase2Moves:[{name:'Compound Interest',icon:'📈',kind:'damage',damage:68,desc:'The debt grows faster and hits harder.'},{name:'Late Fee',icon:'⏰',kind:'double',damage:27,desc:'Two punishing fees land on one hero.'}],
    phase3Moves:[{name:'Bankruptcy',icon:'📉',kind:'aoe',damage:46,desc:'A devastating financial collapse hits everyone.'},{name:'Interest Spiral',icon:'🌀',kind:'buff',damage:0,desc:'Interest compounds into an empowered next attack.'},{name:'Collection Notice',icon:'📬',kind:'damage',damage:82,desc:'The final collection attempt hits one hero.'}]},
  burnout:{name:'THE BURNOUT BEAST',subtitle:'EXHAUSTION • OVERWORK • WORLD BOSS',emoji:'🔥',maxHp:6500,rewardXp:1050,rewardEnergy:150,desc:'It feeds on overwork and gets stronger the longer the party refuses to rest.',moves:[
    {name:'Overwork',icon:'💼',kind:'damage',damage:46,desc:'One hero is pushed past their limit.'},{name:'Exhaustion Wave',icon:'🥱',kind:'aoe',damage:22,desc:'Fatigue rolls across the whole party.'},{name:'Crash',icon:'💥',kind:'heal',damage:0,heal:120,desc:'The beast feeds on exhaustion and recovers.'}],
    phase2Moves:[{name:'Overtime',icon:'⏱️',kind:'double',damage:31,desc:'Two brutal shifts hit the same hero.'},{name:'Fatigue Tax',icon:'🧾',kind:'drain',damage:30,desc:'Exhaustion costs HP and energy.'}],
    phase3Moves:[{name:'Total Burnout',icon:'🔥',kind:'aoe',damage:55,desc:'The beast unleashes a massive exhaustion blast.'},{name:'No Rest',icon:'🚫',kind:'damage',damage:82,desc:'A crushing hit for refusing to slow down.'},{name:'Burnout Spiral',icon:'🌀',kind:'buff',damage:0,desc:'The beast turns accumulated exhaustion into more power.'}]},
  anxiety:{name:'THE ANXIETY HYDRA',subtitle:'FEAR • WHAT-IFS • WORLD BOSS',emoji:'🐍',maxHp:7500,rewardXp:1250,rewardEnergy:175,desc:'Different fears, same monster. Every head feeds on a different what-if.',moves:[
    {name:'Multi-Head Strike',icon:'🐍',kind:'double',damage:34,desc:'Two heads strike the same hero from different angles.'},{name:'Fear Spread',icon:'😰',kind:'aoe',damage:24,desc:'Fear spreads through the entire party.'},{name:'Regenerate',icon:'🌿',kind:'heal',damage:0,heal:150,desc:'A wounded head grows back.'}],
    phase2Moves:[{name:'More Heads',icon:'🐲',kind:'aoe',damage:38,desc:'New fears emerge and attack everyone.'},{name:'What If?',icon:'❓',kind:'buff',damage:0,desc:'The hydra imagines the worst and empowers itself.'}],
    phase3Moves:[{name:'Worst Case',icon:'☠️',kind:'double',damage:50,desc:'The two deadliest fears attack one hero.'},{name:'No Escape',icon:'🕸️',kind:'drain',damage:34,desc:'Anxiety drains HP and combat energy.'},{name:'Full Hydra',icon:'🐉',kind:'heal',damage:0,heal:260,desc:'Every remaining head surges back to life.'}]}
};
const bossIds=['chaos','procrastinator','overthinker','deadline','jobhunter','doomscroller','comfort','debt','burnout','anxiety'];
function bossArtPath(id,phase=1){return 'assets/bosses/'+id+'-hero-hd.png'}
function bossHeroPath(id){return 'assets/bosses/'+id+'-hero-hd.png'}

const classes={
Vanguard:{icon:'🛡️',role:'Tank / Protector',color:'#b87935',desc:'The party’s frontline tank. Absorbs boss pressure, shields allies, and forces enemies to focus on them.',passive:'Iron Resolve: +15 Strike damage, +4 Guard energy, and Vanguard shields are 25% stronger.',ability:{name:'Taunt',icon:'🛡️',cost:10,desc:'Gain a large shield and force the boss to target you next turn while reducing that hit by 35%.'},subclasses:[{id:'warden',name:'Warden',icon:'🏰',desc:'The ultimate protector.',feature:'Guard gives a stronger shield and your next attack +25% damage.'},{id:'berserker',name:'Berserker',icon:'🪓',desc:'A tank who turns low boss HP into overwhelming pressure.',feature:'+30% damage while the boss is at or below 40% HP.'}]},
Arcanist:{icon:'🔮',role:'DPS / Burst Caster',color:'#6f5cc7',desc:'The party’s magical damage dealer. Excels at high burst damage and efficient skill use.',passive:'Arcane Flow: combat skills cost 12% less energy and Arcanist attacks deal +10% damage.',ability:{name:'Overcharge',icon:'💠',cost:10,desc:'Empower your next damaging skill by 35%.'},subclasses:[{id:'pyromancer',name:'Pyromancer',icon:'🔥',desc:'A fire-focused burst specialist.',feature:'+30% damage to Cooking skills.'},{id:'scholar',name:'Scholar',icon:'📚',desc:'A precision caster built around Studying mastery.',feature:'+30% damage to Studying skills and +10% Studying quest XP.'}]},
Ranger:{icon:'🏹',role:'DPS / Crit Striker',color:'#4c9b72',desc:'A fast physical damage dealer who specializes in critical hits and finishing weakened bosses.',passive:'Hunter’s Rhythm: the first damaging attack after completing a quest deals +25 damage.',ability:{name:'Mark Prey',icon:'🎯',cost:8,desc:'Mark the boss. Your next damaging attack deals +40% damage and has a guaranteed critical hit.'},subclasses:[{id:'beastkeeper',name:'Beastkeeper',icon:'🐺',desc:'A sustainable striker supported by a loyal companion.',feature:'Damaging attacks restore 4 energy.'},{id:'shadowstalker',name:'Shadowstalker',icon:'🌑',desc:'A high-risk critical-hit specialist.',feature:'20% chance for a damaging attack to deal 1.6× damage.'}]},
Tactician:{icon:'⚔️',role:'Buffer / Controller',color:'#c05c58',desc:'The party strategist. Improves teammates, manages tempo, and controls the flow of battle.',passive:'Prepared Mind: Focus restores +10 extra energy and Command effects last for the round.',ability:{name:'Command',icon:'📯',cost:8,desc:'Inspire the entire party: all allies deal +20% damage this round and gain 8 energy.'},subclasses:[{id:'duelist',name:'Duelist',icon:'🤺',desc:'A tactical single-target damage specialist.',feature:'Strike deals +25 damage and all skills deal +5% damage.'},{id:'battlechemist',name:'Battlechemist',icon:'⚗️',desc:'A resource-focused tactical support specialist.',feature:'Quest energy rewards are +15% and rounded up.'}]},
Mystic:{icon:'✨',role:'Healer / Support',color:'#a56bd1',desc:'The party healer. Restores HP, protects allies, and keeps the team alive through long boss fights.',passive:'Keen Insight: earn 5% more XP from all quests and milestones. Healing is 15% stronger.',ability:{name:'Heal',icon:'💚',cost:10,desc:'Restore 35% of the lowest-health ally’s max HP and give them a small shield.'},subclasses:[{id:'oracle',name:'Oracle',icon:'🔮',desc:'A predictive support who can turn Focus into offense.',feature:'Once per battle, Focus also deals 60 damage.'},{id:'luminary',name:'Luminary',icon:'🌟',desc:'A radiant healer with stronger Health-based skills.',feature:'+30% damage to Health skills and +20% healing.'}]},
Artificer:{icon:'⚙️',role:'Utility / Shield Support',color:'#7d9aa6',desc:'The party engineer. Creates shields, restores resources, and provides reliable utility while contributing damage.',passive:'Efficient Systems: the first skill each battle costs 5 less energy and Artificer shields are 20% stronger.',ability:{name:'Barrier Array',icon:'🛠️',cost:12,desc:'Deploy a party-wide barrier that gives every living ally 25 shield.'},subclasses:[{id:'engineer',name:'Engineer',icon:'🔧',desc:'A utility specialist who converts productivity into mechanical damage.',feature:'+30% damage to Productivity skills.'},{id:'curator',name:'Curator',icon:'🧹',desc:'A defensive utility specialist built around preparation and protection.',feature:'+30% damage to Cleaning skills and +10 shield from Barrier Array.'}]}
};
const classList=Object.keys(classes);classList.forEach(id=>classes[id].name=id);
const subclassById=Object.fromEntries(classList.flatMap(k=>classes[k].subclasses.map(s=>[s.id,{...s,classId:k}])));
const avatarIcons=['🧙','🧝','🧛','🧟','🧑‍🚀','🧑‍🎤','🥷','🦸','🦹','🧚','🤖','🐲'];
const avatarTones=['#263b67','#5a315e','#61372b','#275a4b','#6b4f25','#3d4b56'];
let avatarDraft=null,classDraft=null,subclassDraft=null,subclassPromptedFor=0;

const quests=[
['Make a simple breakfast','Cooking','Easy',10,5],['Prepare a snack','Cooking','Easy',10,5],['Cook lunch using at least 3 ingredients','Cooking','Medium',25,10],['Plan tomorrow’s dinner and write the ingredients','Cooking','Medium',25,10],['Cook a complete meal from raw ingredients','Cooking','Hard',50,16],['Cook dinner for another person','Cooking','Hard',50,16],['Wipe down your kitchen counters','Cleaning','Easy',10,5],['Put away 10 things that are out of place','Cleaning','Easy',10,5],['Vacuum or sweep one room','Cleaning','Medium',25,10],['Clean and organize one drawer','Cleaning','Medium',25,10],['Deep-clean a room for 30 minutes','Cleaning','Hard',50,16],['Clean out and organize your fridge','Cleaning','Hard',50,16],['Read 10 pages of a book','Studying','Easy',10,5],['Review notes for 15 minutes','Studying','Easy',10,5],['Study for 30 focused minutes','Studying','Medium',25,10],['Complete 10 practice problems','Studying','Medium',25,10],['Make a one-page study guide','Studying','Hard',50,16],['Teach someone a topic you learned','Studying','Hard',50,16],['Take a 15-minute walk','Health','Easy',10,5],['Stretch for 10 minutes','Health','Easy',10,5],['Drink water and prepare tomorrow’s bottle','Health','Medium',25,10],['Do a 20-minute workout','Health','Medium',25,10],['Complete a 40-minute workout or active session','Health','Hard',50,16],['Prepare a balanced meal and clean up afterward','Health','Hard',50,16],['Write tomorrow’s top 3 priorities','Productivity','Easy',10,5],['Clear 10 emails or notifications','Productivity','Easy',10,5],['Finish one important task without multitasking','Productivity','Medium',25,10],['Organize your backpack or workspace','Productivity','Medium',25,10],['Spend 45 minutes on a difficult task','Productivity','Hard',50,16],['Finish a task you have been avoiding','Productivity','Hard',50,16]
];
const classSkillTrees={
Vanguard:{
 core:[{id:'vanguard_guardbreak',name:'Guardbreaker',icon:'🛡️',cost:1,energy:14,dmg:70,cat:'Cleaning',desc:'A disciplined shield strike that opens the enemy.'},{id:'vanguard_rally',name:'Rallying Cry',icon:'📯',cost:1,energy:18,dmg:95,cat:'Health',desc:'Turn resilience into a forceful rallying blow.'},{id:'vanguard_bastion',name:'Bastion Crash',icon:'🏰',cost:2,energy:28,dmg:165,cat:'Productivity',desc:'A crushing attack powered by relentless discipline.'},{id:'vanguard_shieldbash',name:'Shield Bash',icon:'💥',cost:2,energy:23,dmg:135,cat:'Cleaning',desc:'Smash the boss with a reinforced shield.'},{id:'vanguard_fortify',name:'Fortify',icon:'🧱',cost:3,energy:26,dmg:155,cat:'Health',desc:'Convert preparation and endurance into a heavy defensive strike.'},{id:'vanguard_laststand',name:'Last Stand',icon:'⚜️',cost:4,energy:38,dmg:250,cat:'Productivity',desc:'A desperate champion attack that grows stronger when the fight is hardest.'}],
 branches:{
warden:['+','.join(arr)+'],
berserker:['+','.join(arr)+']
}
},
Arcanist:{
 core:[{id:'arcanist_missile',name:'Arcane Missile',icon:'🔮',cost:1,energy:14,dmg:75,cat:'Studying',desc:'A reliable bolt of concentrated knowledge.'},{id:'arcanist_surge',name:'Mana Surge',icon:'💠',cost:1,energy:20,dmg:110,cat:'Studying',desc:'Overcharge your next spell with focused study.'},{id:'arcanist_nova',name:'Astral Nova',icon:'🌌',cost:2,energy:30,dmg:190,cat:'Studying',desc:'A burst of arcane force tears through the arena.'},{id:'arcanist_rift',name:'Reality Rift',icon:'🌀',cost:2,energy:25,dmg:155,cat:'Productivity',desc:'Tear open a temporary rift and strike from another angle.'},{id:'arcanist_comet',name:'Arcane Comet',icon:'☄️',cost:3,energy:34,dmg:235,cat:'Studying',desc:'Call down a focused celestial impact.'},{id:'arcanist_cataclysm',name:'Spell Cataclysm',icon:'🌠',cost:4,energy:43,dmg:320,cat:'Productivity',desc:'Layer multiple spells into one catastrophic burst.'}],
 branches:{
pyromancer:['+','.join(arr)+'],
scholar:['+','.join(arr)+']
}
},
Ranger:{
 core:[{id:'ranger_mark',name:'Hunter’s Mark',icon:'🎯',cost:1,energy:13,dmg:72,cat:'Health',desc:'Mark the boss and strike its weak point.'},{id:'ranger_volley',name:'Rapid Volley',icon:'🏹',cost:1,energy:20,dmg:120,cat:'Productivity',desc:'A fast sequence of precise attacks.'},{id:'ranger_storm',name:'Storm of Arrows',icon:'🌧️',cost:2,energy:31,dmg:195,cat:'Health',desc:'A relentless barrage from every angle.'},{id:'ranger_trap',name:'Snare Trap',icon:'🪤',cost:2,energy:22,dmg:145,cat:'Cleaning',desc:'Prepare the battlefield and punish movement.'},{id:'ranger_headshot',name:'Deadeye',icon:'🎯',cost:3,energy:34,dmg:250,cat:'Studying',desc:'Perfect focus produces a devastating shot.'},{id:'ranger_tempest',name:'Arrow Tempest',icon:'🌪️',cost:4,energy:44,dmg:330,cat:'Productivity',desc:'Fill the arena with impossible precision.'}],
 branches:{
beastkeeper:['+','.join(arr)+'],
shadowstalker:['+','.join(arr)+']
}
},
Tactician:{
 core:[{id:'tactician_feint',name:'Feint',icon:'🤺',cost:1,energy:14,dmg:78,cat:'Productivity',desc:'Outthink the boss and slip past its guard.'},{id:'tactician_combo',name:'Combo Chain',icon:'⚔️',cost:1,energy:22,dmg:130,cat:'Productivity',desc:'Preparation turns several small advantages into one attack.'},{id:'tactician_checkmate',name:'Checkmate',icon:'♟️',cost:2,energy:31,dmg:200,cat:'Studying',desc:'Read the battlefield and end the exchange.'},{id:'tactician_battleplan',name:'Battle Plan',icon:'🗺️',cost:2,energy:23,dmg:150,cat:'Productivity',desc:'Turn preparation into a precise tactical strike.'},{id:'tactician_outplay',name:'Outplay',icon:'🎲',cost:3,energy:34,dmg:245,cat:'Studying',desc:'Predict the boss and punish its pattern.'},{id:'tactician_masterplan',name:'Master Plan',icon:'📋',cost:4,energy:44,dmg:335,cat:'Productivity',desc:'Every move of the battle was part of the plan.'}],
 branches:{
duelist:['+','.join(arr)+'],
battlechemist:['+','.join(arr)+']
}
},
Mystic:{
 core:[{id:'mystic_spark',name:'Soul Spark',icon:'✨',cost:1,energy:14,dmg:70,cat:'Health',desc:'A radiant pulse fueled by wellbeing.'},{id:'mystic_ward',name:'Radiant Ward',icon:'🕯️',cost:1,energy:21,dmg:110,cat:'Health',desc:'Turn restoration into radiant pressure.'},{id:'mystic_seraph',name:'Seraphic Beam',icon:'🌟',cost:2,energy:30,dmg:190,cat:'Health',desc:'A beam of concentrated restorative power.'},{id:'mystic_mend',name:'Mending Pulse',icon:'💚',cost:2,energy:22,dmg:145,cat:'Health',desc:'A healing rhythm becomes a focused attack.'},{id:'mystic_sanctify',name:'Sanctify',icon:'☀️',cost:3,energy:33,dmg:235,cat:'Cleaning',desc:'Purify the battlefield with disciplined care.'},{id:'mystic_rebirth',name:'Rebirth Ray',icon:'🌈',cost:4,energy:44,dmg:325,cat:'Health',desc:'Hope itself becomes a weapon.'}],
 branches:{
oracle:['+','.join(arr)+'],
luminary:['+','.join(arr)+']
}
},
Artificer:{
 core:[{id:'artificer_tool',name:'Toolstrike',icon:'🔧',cost:1,energy:13,dmg:76,cat:'Cleaning',desc:'A perfectly chosen tool becomes a weapon.'},{id:'artificer_mechanism',name:'Mechanism',icon:'⚙️',cost:1,energy:21,dmg:125,cat:'Productivity',desc:'Build a machine that attacks for you.'},{id:'artificer_overclock',name:'Overclock',icon:'🔩',cost:2,energy:30,dmg:195,cat:'Productivity',desc:'Push every system beyond its normal limits.'},{id:'artificer_reinforce',name:'Reinforce',icon:'🧱',cost:2,energy:22,dmg:150,cat:'Cleaning',desc:'Turn careful preparation into a crushing strike.'},{id:'artificer_assembly',name:'Rapid Assembly',icon:'🛠️',cost:3,energy:33,dmg:235,cat:'Productivity',desc:'Build and deploy a complete combat system.'},{id:'artificer_masterwork',name:'Masterwork Machine',icon:'🏗️',cost:4,energy:44,dmg:330,cat:'Cleaning',desc:'A flawless machine delivers devastating power.'}],
 branches:{
engineer:['+','.join(arr)+'],
curator:['+','.join(arr)+']
}
}
};
const allSkills=classList.flatMap(cid=>[...(classSkillTrees[cid]?.core||[]),...Object.values(classSkillTrees[cid]?.branches||{}).flat()].map(s=>({...s,classId:cid})));
const invalidCombatSkills=allSkills.filter(s=>!Number.isFinite(Number(s.dmg))||Number(s.dmg)<=0||!Number.isFinite(Number(s.energy))||Number(s.energy)<=0);
if(invalidCombatSkills.length) console.warn('Invalid combat skill definitions:',invalidCombatSkills.map(s=>s.id));
function totalXp(level){if(level<=0)return 0;let n=level;let x=n<=16?n*n+6*n:(n<=31?2.5*n*n-40.5*n+360:4.5*n*n-162.5*n+2220);return Math.ceil(x*1.25)}
function levelForXp(xp){let l=1;while(l<100&&xp>=totalXp(l))l++;return Math.max(1,l)}
function skillPointsForLevel(l){if(l<=4)return 1;if(l<=8)return 2;if(l<=12)return 3;if(l<=16)return 4;if(l<=20)return 5;return 5+Math.floor((l-20)/5)}
function cumulativePointsToLevel(l){let p=0;for(let i=2;i<=l;i++)p+=skillPointsForLevel(i);return p}
function unlockedSkills(player){return player.skills||[]}
function maxEnergy(player){return 60+player.level*4+(player.stats?.Health||0)*2}
function energyGainTotal(player){return player.quests.filter(q=>q.done).reduce((s,q)=>s+q.energy,0)}
function makeDaily(seed){let x=seed>>>0;const pick=(arr)=>{x=(x*1664525+1013904223)>>>0;return arr[x%arr.length]};let out=[];for(const c of cats){const pool=quests.filter(q=>q[1]===c);const q=pick(pool.filter(a=>a[2]==='Easy'));out.push({title:q[0],category:q[1],difficulty:q[2],xp:q[3],energy:q[4],done:false,id:out.length})}let remaining=quests.filter(q=>!out.some(o=>o.title===q[0]));while(out.length<12){let q=pick(remaining);if(!out.some(o=>o.title===q[0]))out.push({title:q[0],category:q[1],difficulty:q[2],xp:q[3],energy:q[4],done:false,id:out.length})}return out}
function initial(){return{started:false,boss:2000,maxBoss:2000,bossId:'chaos',players:[],ended:false,log:[],turnIndex:0,round:1,turnPhase:'player',actedIds:[],bossBuff:1,lastBossMove:'Waiting for the party…',bossRewardClaimed:false}}
function esc(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function toast(msg){$('toast').textContent=msg;$('toast').classList.remove('hidden');setTimeout(()=>$('toast').classList.add('hidden'),2400)}
function showScreen(name){screens.forEach(s=>$(s).classList.toggle('hidden',s!==name))}
function sendWs(msg){if(ws&&ws.readyState===WebSocket.OPEN)ws.send(JSON.stringify(msg))}
function sync(){if(isHost)sendWs({type:'state',state})}
function me(){return state?.players.find(p=>p.id===myId)}
function defenseFor(p){
  if(!p)return 0;
  const base={Vanguard:15,Arcanist:2,Ranger:3,Tactician:4,Mystic:5,Artificer:8}[p.classId]||0;
  const sub={warden:10,berserker:3,pyromancer:1,scholar:3,beastkeeper:4,shadowstalker:1,duelist:2,battlechemist:4,oracle:3,luminary:5,engineer:4,curator:7}[p.subclassId]||0;
  return Math.min(40,base+sub);
}
function incomingDamage(p,raw,applyShield=true){
  let reduced=Math.max(0,Math.round(Number(raw)||0));
  const def=defenseFor(p);
  reduced=Math.max(0,Math.round(reduced*(1-def/100)));
  if(p.classId==='Vanguard'&&p.taunt)reduced=Math.round(reduced*.65);
  let blocked=0;
  if(applyShield){blocked=Math.min(Number(p.guardShield)||0,reduced);p.guardShield=Math.max(0,(Number(p.guardShield)||0)-blocked);}
  const dealt=Math.max(0,reduced-blocked);
  p.hp=Math.max(0,p.hp-dealt);
  return {dealt,blocked,defense:def,reduced};
}
function addLog(text){state.log.unshift(text);state.log=state.log.slice(0,6)}
function ensurePlayer(p){p.level=levelForXp(p.xp);p.energy=Number.isFinite(Number(p.energy))?Number(p.energy):20;p.energy=Math.max(0,Math.min(p.energy,maxEnergy(p)));p.energyMilestone=p.energyMilestone??0;p.skillPoints=p.skillPoints??0;p.skills=Array.isArray(p.skills)?p.skills:[];p.avatar=p.avatar||{icon:'🧙',tone:'#263b67'};p.stats=p.stats||{Cooking:0,Cleaning:0,Studying:0,Health:0,Productivity:0};p.classId=p.classId||null;p.subclassId=p.subclassId||null;/* Keep subclass state valid across reconnects and old saves. */if(p.subclassId&&!subclassById[p.subclassId])p.subclassId=null;if(p.subclassId&&p.classId&&subclassById[p.subclassId].classId!==p.classId)p.subclassId=null;p.classReady=!!p.classId;p.hunterReady=p.hunterReady??false;p.guardBuff=p.guardBuff??false;p.firstSkillReady=p.firstSkillReady??true;p.oracleUsed=p.oracleUsed??false;p.taunt=p.taunt??false;p.overcharge=p.overcharge??false;p.preyMarked=p.preyMarked??false;p.commandRound=p.commandRound??0;p.healUsedRound=p.healUsedRound??0;p.abilityUsedRound=p.abilityUsedRound??0;p.maxHp=p.maxHp||100+p.level*5+(p.stats.Health||0)*8;p.hp=Number.isFinite(Number(p.hp))?Math.min(p.maxHp,Number(p.hp)):p.maxHp;p.guardShield=p.guardShield??0}
function addXp(p,amount){const old=p.level;p.xp+=amount;ensurePlayer(p);if(p.level>old){let milestone=false;for(let l=old+1;l<=p.level;l++){p.skillPoints+=skillPointsForLevel(l);if(l%5===0)milestone=true}if(milestone){p.energy=maxEnergy(p);p.energyMilestone=p.level;addLog('⚡ '+p.name+' reached a major milestone and fully restored energy!')}return p.level-old}return 0}
function createPlayer(id,name,host,seed){let p={id,name,xp:0,level:1,energy:20,skillPoints:0,skills:[],classId:null,subclassId:null,classReady:false,hunterReady:false,guardBuff:false,firstSkillReady:true,oracleUsed:false,taunt:false,overcharge:false,preyMarked:false,commandRound:0,healUsedRound:0,abilityUsedRound:0,energyMilestone:0,avatar:{icon:avatarIcons[(seed-1)%avatarIcons.length],tone:avatarTones[(seed-1)%avatarTones.length]},stats:{Cooking:0,Cleaning:0,Studying:0,Health:0,Productivity:0},maxHp:105,hp:105,guardShield:0,quests:makeDaily(seed)};return p}
function renderAll(){const p=me();if(!p)return;ensurePlayer(p);$('roomPill').textContent='Room: '+roomCode;$('playerName').textContent=p.name;$('playerLevel').textContent='Level '+p.level;$('classBadge').textContent=p.classId?(classes[p.classId].icon+' '+classes[p.classId].name):'⚔️ Choose Class';if(p.subclassId)$('classBadge').textContent+=' • '+subclassById[p.subclassId].name;$('playerAvatar').style.background=p.avatar.tone;$('playerAvatar').querySelector('.avatarIcon').textContent=p.avatar.icon;$('xpText').textContent=p.xp+' XP';let prev=totalXp(p.level-1),next=totalXp(p.level);$('xpNext').textContent=p.level>=100?'MAX':'Next: '+next;$('xpBar').style.width=(p.level>=100?100:Math.max(0,Math.min(100,(p.xp-prev)/(next-prev)*100)))+'%';$('energy').textContent=p.energy;$('energyMax').textContent=maxEnergy(p)+' max';$('energyBar').style.width=(p.energy/maxEnergy(p)*100)+'%';$('skillPoints').textContent=p.skillPoints;$('defense').textContent=defenseFor(p)+'%';$('shield').textContent=Number(p.guardShield)||0;$('bossHp').textContent=state.boss.toLocaleString()+' / '+state.maxBoss.toLocaleString()+' HP';$('bossBar').style.width=Math.max(0,state.boss/state.maxBoss*100)+'%';const boss=bosses[state.bossId]||bosses.chaos;const phase=Number(state.bossPhase)||1; const phaseLabel=phase===3?'III — FINAL':phase===2?'II — ENRAGED':'I — AWAKENING'; $('bossPhase').textContent=phaseLabel;
$('bossPartyTurn').textContent=turnText();$('bossName').textContent=boss.name;$('bossSub').textContent=boss.subtitle;$('bossImage').src=bossArtPath(state.bossId,phase);$('bossImage').dataset.phase=phase;$('bossImage').alt=boss.name+' Phase '+phase+' artwork';$('bossPhaseArt').textContent='PHASE '+phase+' • '+(phase===3?'FINAL':phase===2?'ENRAGED':'AWAKENING');$('bossPartyTurn').textContent=turnText();$('bossMove').textContent=state.lastBossMove||'';$('dragonFallback').textContent=boss.emoji;$('playerHp').textContent=p.hp+' / '+p.maxHp+' HP';$('playerHpBar').style.width=Math.max(0,p.hp/p.maxHp*100)+'%';$('partyDamage').textContent=(state.maxBoss-state.boss).toLocaleString();$('combatLog').innerHTML=state.log.map(x=>'<div>'+esc(x)+'</div>').join('');const roleAbility=(classes[p.classId]||classes.Vanguard).ability;
let roleAbilityDesc=roleAbility.desc;
if(p.classId==='Artificer'&&roleAbility.name==='Barrier Array'){
 const barrierShield=25+(p.subclassId==='curator'?10:0);
 roleAbilityDesc='Deploy a party-wide barrier that gives every living ally '+barrierShield+' shield.';
}
if($('classAbilityBtn')){$('classAbilityBtn').innerHTML='<strong>'+roleAbility.icon+' '+roleAbility.name+'</strong><span>'+roleAbility.cost+' energy • '+esc(roleAbilityDesc)+'</span>';}
const canMove=canAct(p);['basicAttack','defendBtn','focusBtn','skipBtn','skillAttack','classAbilityBtn'].forEach(id=>{if($(id))$(id).disabled=!canMove});document.querySelectorAll('[data-battle-skill]').forEach(b=>b.disabled=!canMove||Number(p.energy)<Number(allSkills.find(s=>s.id===b.dataset.battleSkill)?.energy||0));$('questCount').textContent=p.quests.filter(q=>q.done).length+' / 12';$('dailyBonus').textContent=p.quests.filter(q=>q.done).length>=12?'🏆 Daily Mastery: +100 XP earned!':p.quests.filter(q=>q.done).length>=8?'🔥 8 quests: bonus milestone reached!':p.quests.filter(q=>q.done).length>=4?'⭐ 4 quests: bonus milestone reached!':'Complete 4, 8, and 12 quests for bonus XP.';renderAttributes(p);renderQuestFilters(p);renderSkills(p);renderParty();renderHero(p);maybePromptSubclass(p);updateReward(p)}
function renderHero(p){const c=classes[p.classId]||classes.Vanguard;const sc=p.subclassId&&subclassById[p.subclassId]&&subclassById[p.subclassId].classId===p.classId?subclassById[p.subclassId]:null;$('heroClassIcon').textContent=c.icon;$('heroClassTitle').textContent=c.name;$('heroClassRole').textContent=c.role;$('heroClassDesc').textContent=c.desc;$('heroPassive').textContent=c.passive;if(sc){$('heroSubclassTitle').textContent=sc.icon+' '+sc.name;$('heroSubclassDesc').textContent=sc.desc+' '+sc.feature;$('heroChooseSubclass').textContent='Change Subclass';$('heroChooseSubclass').disabled=false;}else{$('heroSubclassTitle').textContent=p.level>=5?'Choose your subclass':'Locked until Level 5';$('heroSubclassDesc').textContent=p.level>=5?'Choose one of two specialization paths.':'Reach level 5 to specialize your class.';$('heroChooseSubclass').textContent=p.level>=5?'Choose Subclass':'Locked';$('heroChooseSubclass').disabled=p.level<5}}
function openAvatar(){
 const p=me(); if(!p)return;
 avatarDraft={icon:p.avatar?.icon||'🧙',tone:p.avatar?.tone||avatarTones[0]};
 $('avatarChoices').innerHTML=avatarIcons.map(icon=>`<button type="button" class="avatarChoice ${avatarDraft.icon===icon?'selected':''}" data-avatar-icon="${icon}">${icon}</button>`).join('');
 $('toneChoices').innerHTML=avatarTones.map(tone=>`<button type="button" class="toneChoice ${avatarDraft.tone===tone?'selected':''}" data-avatar-tone="${tone}" style="background:${tone}"></button>`).join('');
 $('avatarChoices').querySelectorAll('[data-avatar-icon]').forEach(b=>b.onclick=()=>{avatarDraft.icon=b.dataset.avatarIcon;$('avatarChoices').querySelectorAll('[data-avatar-icon]').forEach(x=>x.classList.toggle('selected',x===b))});
 $('toneChoices').querySelectorAll('[data-avatar-tone]').forEach(b=>b.onclick=()=>{avatarDraft.tone=b.dataset.avatarTone;$('toneChoices').querySelectorAll('[data-avatar-tone]').forEach(x=>x.classList.toggle('selected',x===b))});
 $('avatarModal').classList.remove('hidden');
}
function closeAvatar(){$('avatarModal').classList.add('hidden')}
function saveAvatar(){
 if(!avatarDraft)return;
 if(!isHost&&ws?.readyState===WebSocket.OPEN){sendWs({type:'avatar',playerId:myId,icon:avatarDraft.icon,tone:avatarDraft.tone});return}
 else doUpdateAvatar(myId,avatarDraft.icon,avatarDraft.tone);
 closeAvatar();
}
function openClassModal(){
 const p=me(); if(!p)return;
 if(state.started){toast('Your class is locked once the game starts.');return}
 classDraft=p.classId||null;
 const box=$('classChoices');
 box.innerHTML=classList.map(id=>{const c=classes[id];return `<div class="classChoice ${classDraft===id?'selected':''}" data-class-choice="${id}" tabindex="0" role="button" aria-pressed="${classDraft===id}"><span class="classIcon">${c.icon}</span><div class="role">${c.role}</div><h4>${c.name}</h4><p>${c.desc}</p><div class="passive"><b>Feature:</b> ${c.passive}</div></div>`}).join('');
 box.onclick=e=>{const card=e.target.closest('[data-class-choice]');if(!card)return;e.preventDefault();classDraft=card.dataset.classChoice;box.querySelectorAll('[data-class-choice]').forEach(x=>{const on=x===card;x.classList.toggle('selected',on);x.setAttribute('aria-pressed',on?'true':'false')})};
 box.onkeydown=e=>{if(e.key!=='Enter'&&e.key!==' ')return;const card=e.target.closest('[data-class-choice]');if(!card)return;e.preventDefault();card.click()};
 const modal=$('classModal');modal.classList.remove('hidden');modal.setAttribute('aria-hidden','false');
}
function closeClassModal(){const modal=$('classModal');modal.classList.add('hidden');modal.setAttribute('aria-hidden','true')}
function setClass(id){
 if(!classes[id])return;
 if(!isHost && ws?.readyState===WebSocket.OPEN){sendWs({type:'class',id,playerId:myId});return}
 doSetClass(myId,id);
}
function doSetClass(pid,id){
 const p=state?.players?.find(x=>x.id===pid);
 if(!p||!classes[id]||state.started)return;
 const classChanged=p.classId!==id;
 p.classId=id;
 p.classReady=true;
 if(classChanged) p.subclassId=null;
 addLog('⚔️ '+p.name+' chose '+classes[id].name+'.');
 sync();
 renderLobby();
}
function saveClassChoice(){
 const id=classDraft;
 if(!id||!classes[id]){toast('Click a class first.');return}
 const p=me(); if(!p){closeClassModal();return}
 const btn=$('saveClass');
 if(btn.disabled)return;
 btn.disabled=true;btn.textContent='Saving…';
 try{
   setClass(id);
   closeClassModal();
   toast('Class selected: '+classes[id].name);
 }catch(err){console.error(err);toast('Could not save class. Try again.')}finally{
   setTimeout(()=>{btn.disabled=false;btn.textContent='Confirm Class'},300);
 }
}
function openSubclassModal(){const p=me();if(!p||p.level<5)return;subclassDraft=p.subclassId||null;const c=classes[p.classId];$('subclassIntro').textContent='Choose how your '+c.name+' specializes. This choice changes combat immediately.';$('subclassChoices').innerHTML=c.subclasses.map(sc=>`<button type="button" class="subclassChoice ${subclassDraft===sc.id?'selected':''}" data-subclass-choice="${sc.id}"><div style="font-size:34px">${sc.icon}</div><h4>${sc.name}</h4><p>${sc.desc}</p><div class="classFeature"><b>Subclass Feature</b><div>${sc.feature}</div></div></button>`).join('');document.querySelectorAll('[data-subclass-choice]').forEach(b=>b.onclick=()=>{subclassDraft=b.dataset.subclassChoice;document.querySelectorAll('[data-subclass-choice]').forEach(x=>x.classList.toggle('selected',x===b))});$('subclassModal').classList.remove('hidden')}
function closeSubclassModal(){$('subclassModal').classList.add('hidden')}
function saveSubclassChoice(){if(!subclassDraft){toast('Choose a subclass first.');return}setSubclass(subclassDraft);closeSubclassModal()}
function setSubclass(id){if(!subclassById[id])return;if(!isHost&&ws?.readyState===WebSocket.OPEN){sendWs({type:'subclass',id,playerId:myId});closeSubclassModal();return}doSetSubclass(myId,id)}
function doSetSubclass(pid,id){const p=state.players.find(x=>x.id===pid);const sc=subclassById[id];if(!p||!sc||!p.classId||p.level<5)return false;if(sc.classId!==p.classId){toast('That subclass does not belong to your current class.');return false}const changed=p.subclassId!==id;p.subclassId=sc.id;p.classReady=true;subclassPromptedFor=p.level;addLog('🌟 '+p.name+(changed?' specialized as ':' selected ')+sc.name+'!');sync();renderAll();toast((changed?'Subclass selected: ':'Subclass active: ')+sc.name);return true}
function maybePromptSubclass(p){if(p.level>=5&&!p.subclassId&&subclassPromptedFor!==p.level){subclassPromptedFor=p.level;setTimeout(openSubclassModal,150)}}
function renderAttributes(p){$('attributes').innerHTML=cats.map(c=>`<div class="levelLine" style="padding:5px 0"><span>${c}</span><b>${p.stats[c]}</b></div>`).join('')+`<div class="levelLine" style="padding:5px 0"><span>Defense</span><b>${defenseFor(p)}%</b></div><div class="levelLine" style="padding:5px 0"><span>Active Shield</span><b>${Number(p.guardShield)||0}</b></div>`}
function renderQuestFilters(p){
const cb=['All',...cats];
$('categoryFilters').innerHTML=cb.map(c=>`<button class="tab ${activeCat===c?'active':''}" data-cat="${c}">${c}</button>`).join('');
$('difficultyFilters').innerHTML=['All','Easy','Medium','Hard'].map(d=>`<button class="tab ${activeDiff===d?'active':''}" data-diff="${d}">${d}</button>`).join('');
document.querySelectorAll('[data-cat]').forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat;renderAll()});
document.querySelectorAll('[data-diff]').forEach(b=>b.onclick=()=>{activeDiff=b.dataset.diff;renderAll()});
let qs=p.quests.filter(q=>(activeCat==='All'||q.category===activeCat)&&(activeDiff==='All'||q.difficulty===activeDiff));
$('questList').innerHTML=qs.map(q=>`<div class="quest ${q.done?'done':''}"><div><h4>${q.done?'✓ ':''}${esc(q.title)}</h4><div class="questMeta">${q.category} • <span class="diff-${q.difficulty}">${q.difficulty}</span></div></div><div><div class="questReward">+${q.xp} XP • +${q.energy} ⚡</div><button class="primary" style="margin-top:7px;width:100%" ${q.done?'disabled':''} data-qid="${q.id}">${q.done?'Completed':(state.started?'Complete Quest • Uses Turn':'Complete Quest')}</button></div></div>`).join('');
document.querySelectorAll('[data-qid]').forEach(b=>b.onclick=()=>completeQuest(Number(b.dataset.qid)));
let done=p.quests.filter(q=>q.done).length;
$('questProgressBar').style.width=(done/p.quests.length*100)+'%';
$('questBoardHint').textContent=done>=12?'🏆 Daily Mastery complete!':done>=8?'🔥 8 quests complete — final milestone unlocked!':done>=4?'⭐ 4 quests complete — keep going for the 8 and 12 quest bonuses.':'Complete 4, 8, and 12 quests for milestone bonuses.';
}
function renderSkills(p){
const tree=classSkillTrees[p.classId]||classSkillTrees.Vanguard;const c=classes[p.classId]||classes.Vanguard;
$('skillPointHeader').textContent=p.skillPoints+' points';
const activeSubclass=p.subclassId&&subclassById[p.subclassId]?.classId===p.classId?p.subclassId:null;
const nodeHtml=(s,i,arr,branch=false)=>{let u=p.skills.includes(s.id);let prev=arr[i-1];let coreReq=s.requiresCore?tree.core[s.requiresCore-1]:null;/* A subclass branch starts as soon as the subclass is selected. The first branch node may optionally require a core node, but never a hidden previous node. */let prevReq=s.requiresPrev===true?prev:null;let avail=!u&&(!prevReq||p.skills.includes(prevReq.id))&&(!coreReq||p.skills.includes(coreReq.id))&&(!branch||activeSubclass===branch);let lockedReason=!branch?'':'Choose this subclass to unlock this branch';let preview=skillPreview(p,s);let numberLabel=preview!==Number(s.dmg)?`${preview} dmg <span class="muted">(base ${s.dmg})</span>`:`${s.dmg} dmg`;return `<div class="skillNode ${u?'unlocked':''} ${avail?'available':''}"><span class="ico">${s.icon}</span><b>${s.name}</b><div class="small">${numberLabel} • ${s.energy}⚡</div><div class="desc">${s.desc}</div>${u?`<div class="small" style="color:#6bd29b">✓ Unlocked</div><button class="skillUse ${p.energy>=s.energy?'ready':''}" data-use-skill="${s.id}">⚔ Use in Battle</button>`:avail?`<button data-skill="${s.id}">Unlock <span class="cost">${s.cost} SP</span></button>`:`<div class="small">${lockedReason||'Locked'}</div>`}</div>`};
let core=tree.core.map((s,i)=>nodeHtml(s,i,tree.core,false)).join('');
let branches=Object.entries(tree.branches||{}).map(([subId,arr])=>{const sc=subclassById[subId];const locked=activeSubclass!==subId;return `<div class="skillBranch classBranch ${locked?'branchLocked':''}"><h4>${sc.icon} ${sc.name} <span class="muted">${locked?'(locked)': '(specialization)'}</span></h4><div class="skillNodes">${arr.map((s,i)=>nodeHtml(s,i,arr,true)).join('')}</div>${locked?`<div class="branchLock">${activeSubclass?`Your active subclass is ${subclassById[activeSubclass].name}.`:'Reach Level 5 and choose this subclass to unlock this branch.'}</div>`:''}</div>`}).join('');
const cats=['Cooking','Cleaning','Studying','Health','Productivity']; const mastery=cats.map(cat=>`<div class="miniStat"><span>${cat.toUpperCase()}</span><b>${p.stats?.[cat]||0}</b><div class="small muted">quest mastery</div></div>`).join(''); $('skillTree').innerHTML=`<div class="skillTreeTitle"><div><span style="font-size:24px">${c.icon}</span> <b>${c.name} Skill Tree</b><div class="muted">6 core skills + 7 skills in each specialization. Choose a branch and build toward its ultimate.</div></div><span class="badge">${p.skillPoints} SP</span></div><div class="panel" style="padding:10px;margin-bottom:10px"><div class="small" style="color:#dcb65d;font-weight:900;margin-bottom:7px">📈 REAL-LIFE MASTERY</div><div class="miniStats">${mastery}</div></div>`+`<div class="skillBranch coreBranch"><h4>⚔️ ${c.name} Core</h4><div class="skillNodes">${core}</div></div>${branches}`;
document.querySelectorAll('[data-skill]').forEach(b=>b.onclick=()=>unlockSkill(b.dataset.skill));document.querySelectorAll('[data-use-skill]').forEach(b=>b.onclick=()=>doAction(b.dataset.useSkill));renderBattleSkills(p);
}
function skillPreview(p,s){
 let bonus=1+(p.stats?.[s.cat||'Productivity']||0)*.03;
 if(p.classId==='Arcanist')bonus*=1.1;
 if(p.classId==='Mystic')bonus*=.85;
 if(p.classId==='Artificer')bonus*=.95;
 if(p.classId==='Arcanist'&&p.subclassId==='pyromancer'&&(s.cat||'Productivity')==='Cooking')bonus*=1.3;
 if(p.classId==='Arcanist'&&p.subclassId==='scholar'&&(s.cat||'Productivity')==='Studying')bonus*=1.3;
 if(p.classId==='Mystic'&&p.subclassId==='luminary'&&(s.cat||'Productivity')==='Health')bonus*=1.3;
 if(p.classId==='Artificer'&&p.subclassId==='engineer'&&(s.cat||'Productivity')==='Productivity')bonus*=1.3;
 if(p.classId==='Artificer'&&p.subclassId==='curator'&&(s.cat||'Productivity')==='Cleaning')bonus*=1.3;
 if(p.classId==='Tactician'&&p.subclassId==='duelist')bonus*=1.05;
 return Math.max(1,Math.round(Number(s.dmg)*bonus));
}
function renderBattleSkills(p){const tray=$('battleSkillTray');const unlocked=allSkills.filter(s=>s.classId===p.classId&&p.skills.includes(s.id));if(!unlocked.length){tray.innerHTML='<div class="noSkills">🔒 Unlock a class skill to place combat abilities here.</div>';return}tray.innerHTML=unlocked.map(s=>{const preview=skillPreview(p,s);const detail=preview!==Number(s.dmg)?`${s.energy}⚡ • ${preview} dmg <span class="muted">(base ${s.dmg})</span>`:`${s.energy}⚡ • ${s.dmg} dmg`;return `<button class="battleSkill ${p.energy>=s.energy?'ready':''}" data-battle-skill="${s.id}"><b>${s.icon} ${s.name}</b><span>${detail}</span></button>`}).join('');document.querySelectorAll('[data-battle-skill]').forEach(b=>b.onclick=()=>doAction(b.dataset.battleSkill));}
function renderParty(){const arr=[...state.players].sort((a,b)=>b.xp-a.xp);$('leaderboard').innerHTML=arr.map((p,i)=>`<div class="leaderRow"><span>${i===0?'🏆 ':''}${(classes[p.classId]||classes.Vanguard).icon} ${esc(p.name)} <span class="badge">Lv ${p.level}</span> <span class="badge">${esc((classes[p.classId]||classes.Vanguard).name)}</span>${p.subclassId?` <span class="badge">${esc(subclassById[p.subclassId].name)}</span>`:''}</span><b>${p.xp} XP</b></div>`).join('')}
function updateReward(p){let n=p.level+1;let pts=skillPointsForLevel(n);$('nextReward').innerHTML=`<b>Level ${n}</b><br>+${pts} skill point${pts>1?'s':''}<br><span class="muted">Subclass unlocks at Level 5. Class bonuses stack with your skill tree.</span>`}
function unlockSkill(id){if(!isHost&&ws?.readyState===WebSocket.OPEN){sendWs({type:'unlock',id,playerId:myId});return}doUnlock(myId,id)}
function doUnlock(pid,id){let p=state.players.find(x=>x.id===pid);let s=allSkills.find(x=>x.id===id);if(!p||!s||s.classId!==p.classId||p.skills.includes(id)||p.skillPoints<s.cost)return;const tree=classSkillTrees[p.classId];let arr=tree.core;let branchName=null;for(const [subId,list] of Object.entries(tree.branches||{})){if(list.some(x=>x.id===id)){arr=list;branchName=subId;break}}let idx=arr.findIndex(x=>x.id===id);if(branchName&&p.subclassId!==branchName){toast('Choose this subclass to unlock its skill tree.');return}let prevReq=s.requiresPrev===true?arr[idx-1]:null;if(prevReq&&!p.skills.includes(prevReq.id)){toast('Unlock the previous skill in this branch first.');return}let coreReq=s.requiresCore?tree.core[s.requiresCore-1]:null;if(coreReq&&!p.skills.includes(coreReq.id)){toast('Unlock '+coreReq.name+' first.');return}p.skillPoints-=s.cost;p.skills.push(id);let cat=s.cat||'Productivity';p.stats[cat]=(p.stats[cat]||0)+1;addLog('✨ '+p.name+' unlocked '+s.name+' in the '+classes[p.classId].name+' tree!');sync();renderAll();toast(s.name+' unlocked')}
function completeQuest(id){if(!isHost&&ws?.readyState===WebSocket.OPEN){sendWs({type:'quest',id,playerId:myId});return}doCompleteQuest(myId,id)}
function doCompleteQuest(pid,id){
 let p=state.players.find(x=>x.id===pid);let q=p?.quests.find(x=>x.id===id);
 if(!p||!q||q.done||state.ended)return;
 if(state.started&&!canAct(p)){if(pid===myId)toast(state.turnPhase==='boss'?'The boss is attacking. Wait for the next round.':'You already acted this round. Wait for the other heroes.');return}
 q.done=true;
 p.stats=p.stats||{Cooking:0,Cleaning:0,Studying:0,Health:0,Productivity:0};
 p.stats[q.category]=(p.stats[q.category]||0)+1;
 let energyGain=q.energy;
 if(p.classId==='Tactician'&&p.subclassId==='battlechemist')energyGain=Math.ceil(energyGain*1.15);
 p.energy=Math.min(maxEnergy(p),p.energy+energyGain);
 p.hunterReady=p.classId==='Ranger';
 let gained=q.xp;
 if(p.classId==='Arcanist'&&p.subclassId==='scholar'&&q.category==='Studying')gained=Math.round(gained*1.10);
 if(p.classId==='Mystic')gained=Math.round(gained*1.05);
 let completed=p.quests.filter(x=>x.done).length;
 if(completed===4)gained+=20;if(completed===8)gained+=40;if(completed===12)gained+=100;
 let lv=addXp(p,gained);
 addLog('📜 '+p.name+' completed '+q.title+' and gained '+gained+' XP'+(state.started?' — their turn is spent.':'')+'.');
 if(lv){addLog('⬆️ '+p.name+' reached level '+p.level+'!');if(pid===myId)showLevelUp(p,lv)}
 if(state.started){state.actedIds=Array.from(new Set([...(state.actedIds||[]),p.id]));if(remainingAttackers().length===0){bossTurn();return}}
 sync();renderAll()
}
function showLevelUp(p,count){$('levelNumber').textContent=p.level;$('levelUpText').textContent='You gained '+count+' level'+(count>1?'s':'')+' and '+skillPointsForLevel(p.level)+' skill points at this level.'+(p.level>=5&&!p.subclassId?' Reach Level 5 to choose your subclass!':'');$('levelUp').classList.remove('hidden')}
function livingPlayers(){return state.players.filter(p=>Number(p.hp)>0)}
function currentPlayer(){return state.players[state.turnIndex]}
function remainingAttackers(){return livingPlayers().filter(p=>!(state.actedIds||[]).includes(p.id))}
function turnText(){
  if(!state||!state.started)return 'Waiting for battle…';
  if(state.ended)return 'Battle over';
  if(state.turnPhase==='boss')return '👹 Boss Turn — The party acted!';
  const left=remainingAttackers();
  if(!left.length)return '👹 Boss Turn';
  if(state.actedIds?.includes(myId))return '⏳ You acted — waiting for the rest of the party…';
  return '⚔️ All heroes attack! Your turn to act.';
}
function bossPhaseForHp(){
  const ratio=state.maxBoss>0?state.boss/state.maxBoss:1;
  if(ratio<=1/3)return 3;
  if(ratio<=0.5)return 2;
  return 1;
}
function updateBossPhase(){
  const next=bossPhaseForHp();
  const current=Number(state.bossPhase)||1;
  if(next>current){
    state.bossPhase=next;
    const boss=bosses[state.bossId]||bosses.chaos;
    if(next===2){
      state.bossBuff=Math.max(state.bossBuff||1,1.25);
      addLog('🔥 PHASE II: '+boss.name+' has reached 50% HP and entered an enraged phase! New attacks unlocked.');
    }else if(next===3){
      state.bossBuff=Math.max(state.bossBuff||1,1.5);
      addLog('☠️ PHASE III: '+boss.name+' is below one-third HP and enters its final phase! Its deadliest attacks are unleashed.');
    }
    return true;
  }
  return false;
}
function phaseMovesForBoss(boss){
  const phase=Number(state.bossPhase)||1;
  if(phase>=3 && boss.phase3Moves?.length)return [...boss.moves,...boss.phase2Moves||[],...boss.phase3Moves];
  if(phase>=2 && boss.phase2Moves?.length)return [...boss.moves,...boss.phase2Moves];
  return boss.moves;
}
function bossTurn(){
  if(state.ended)return;
  const boss=bosses[state.bossId]||bosses.chaos;
  const alive=livingPlayers();
  if(!alive.length){state.ended=true;addLog('☠️ The entire party was defeated.');sync();renderAll();finish();return}
  state.turnPhase='boss';
  const movePool=phaseMovesForBoss(boss); const move=movePool[Math.floor(Math.random()*movePool.length)]; const phaseMultiplier=(Number(state.bossPhase)||1)===3?1.2:((Number(state.bossPhase)||1)===2?1.1:1);
  const taunter=alive.find(x=>x.taunt); const pickTarget=()=>taunter||alive[Math.floor(Math.random()*alive.length)];
  let text='';
  if(move.kind==='heal'){
    const before=state.boss;state.boss=Math.min(boss.maxHp,state.boss+(move.heal||0));text='💚 '+boss.name+' used '+move.icon+' '+move.name+' and healed '+(state.boss-before)+' HP.';
  }else if(move.kind==='buff'){
    state.bossBuff=Math.min(2.5,(state.bossBuff||1)+0.35);text='😈 '+boss.name+' used '+move.icon+' '+move.name+'. Its next attack is empowered!';
  }else if(move.kind==='aoe'){
    const dmg=Math.round(move.damage*(state.bossBuff||1)*phaseMultiplier);state.bossBuff=1;
    const reports=[];alive.forEach(p=>{reports.push({p,r:incomingDamage(p,dmg,true)});});
    const avg=Math.round(reports.reduce((a,x)=>a+x.r.dealt,0)/Math.max(1,reports.length));
    text='🔥 '+boss.name+' used '+move.icon+' '+move.name+' for '+dmg+' base damage to the whole party. Defense reduced the average hit to '+avg+'.';
  }else if(move.kind==='drain'){
    const target=pickTarget();let dmg=Math.round(move.damage*(state.bossBuff||1)*phaseMultiplier);state.bossBuff=1;const r=incomingDamage(target,dmg,true);target.energy=Math.max(0,(Number(target.energy)||0)-12);text='🌀 '+boss.name+' used '+move.icon+' '+move.name+' on '+target.name+' for '+r.dealt+' damage after '+r.defense+'% defense'+(r.blocked?' and '+r.blocked+' shield blocked.':'')+' and drained 12⚡.';
  }else if(move.kind==='double'){
    const target=pickTarget();let dmg=Math.round(move.damage*(state.bossBuff||1)*phaseMultiplier);state.bossBuff=1;let total=0,blockedTotal=0;for(let i=0;i<2&&target.hp>0;i++){const r=incomingDamage(target,dmg,true);total+=r.dealt;blockedTotal+=r.blocked;}text='⚡ '+boss.name+' used '+move.icon+' '+move.name+' on '+target.name+' for '+total+' total damage after '+defenseFor(target)+'% defense'+(blockedTotal?' and '+blockedTotal+' shield blocked.':'')+'.';
  }else{
    const target=pickTarget();const dmg=Math.round(move.damage*(state.bossBuff||1)*phaseMultiplier);state.bossBuff=1;const r=incomingDamage(target,dmg,true);text='💥 '+boss.name+' used '+move.icon+' '+move.name+' on '+target.name+' for '+r.dealt+' damage after '+r.defense+'% defense'+(r.blocked?' and '+r.blocked+' shield blocked.':'')+'.';
  }
  state.lastBossMove=text;addLog(text);
  if(!livingPlayers().length){state.ended=true;addLog('☠️ The party was defeated by '+boss.name+'.');sync();renderAll();finish();return}
  alive.forEach(x=>x.taunt=false);state.actedIds=[];
  state.turnPhase='player';
  state.round++;
  sync();renderAll();
}
function canAct(p){
  return p&&state.started&&!state.ended&&state.turnPhase==='player'&&Number(p.hp)>0&&!((state.actedIds||[]).includes(p.id));
}
function attack(pid,kind){
 let p=state.players.find(x=>x.id===pid);if(!p||state.ended)return;ensurePlayer(p);
 if(!canAct(p)){if(pid===myId)toast(state.turnPhase==='boss'?'The boss is attacking. Wait for the next round.':'You already acted this round. Wait for the other heroes.');return}
 let dmg=0;
 if(kind==='skip'){addLog('⏭️ '+p.name+' skipped their turn (0⚡).');}
 else if(kind==='classAbility'){
  const c=p.classId, ability=(classes[c]||classes.Vanguard).ability, cost=ability.cost;
  if(p.abilityUsedRound===state.round){toast(ability.name+' can only be used once per round.');return}
  const energy=Number(p.energy)||0;if(energy<cost){toast('Not enough energy for '+ability.name+'.');return}p.energy=energy-cost;p.abilityUsedRound=state.round;
  if(c==='Vanguard'){
    p.taunt=true;p.guardShield=45+(p.subclassId==='warden'?15:0);addLog('🛡️ '+p.name+' used Taunt: '+p.guardShield+' shield and the boss is forced to target them next turn.');
  }else if(c==='Arcanist'){
    p.overcharge=true;addLog('💠 '+p.name+' used Overcharge: next damaging attack deals +35% damage.');
  }else if(c==='Ranger'){
    p.preyMarked=true;addLog('🎯 '+p.name+' marked the boss: next damaging attack is a guaranteed critical for +40% damage.');
  }else if(c==='Tactician'){
    state.partyDamageBuff=1.2;state.partyDamageBuffRound=state.round;state.players.filter(x=>Number(x.hp)>0).forEach(x=>x.energy=Math.min(maxEnergy(x),(Number(x.energy)||0)+8));addLog('📯 '+p.name+' used Command: the whole party gains +20% damage this round and 8⚡.');
  }else if(c==='Mystic'){
    const allies=livingPlayers().sort((a,b)=>(a.hp/a.maxHp)-(b.hp/b.maxHp));const target=allies[0];const heal=Math.round(target.maxHp*(p.subclassId==='luminary'?.55:.35));const before=target.hp;target.hp=Math.min(target.maxHp,target.hp+heal);target.guardShield=(target.guardShield||0)+20;addLog('💚 '+p.name+' healed '+target.name+' for '+(target.hp-before)+' HP and gave them 20 shield.');
  }else if(c==='Artificer'){
    const shield=25+(p.subclassId==='curator'?10:0);livingPlayers().forEach(x=>x.guardShield=(x.guardShield||0)+shield);addLog('🛠️ '+p.name+' deployed a Barrier Array: every living ally gained '+shield+' shield.');
  }
 }else if(kind==='basic'){
  const cost=8,currentEnergy=Number(p.energy)||0;if(currentEnergy<cost){toast(`Not enough energy. You have ${currentEnergy}⚡ and Strike costs ${cost}⚡.`);return}p.energy=currentEnergy-cost;dmg=35+(p.classId==='Vanguard'?15:0)+(p.classId==='Tactician'&&p.subclassId==='duelist'?25:0);if(p.classId==='Arcanist')dmg=Math.round(dmg*1.1);if(p.classId==='Mystic')dmg=Math.round(dmg*.85);if(p.classId==='Artificer')dmg=Math.round(dmg*.95);if(p.overcharge){dmg=Math.round(dmg*1.35);p.overcharge=false;addLog('💠 '+p.name+' consumed Overcharge!');}if(p.preyMarked){dmg=Math.round(dmg*1.4*1.6);p.preyMarked=false;addLog('🎯 '+p.name+' landed a guaranteed critical on Marked Prey!');}if(p.classId==='Ranger'&&p.subclassId==='shadowstalker'&&Math.random()<.2)dmg=Math.round(dmg*1.6);if(p.classId==='Ranger'&&p.hunterReady){dmg+=25;p.hunterReady=false;addLog('🏹 '+p.name+' triggered Hunter’s Rhythm!')}if(p.classId==='Vanguard'&&p.subclassId==='berserker'&&state.boss<=state.maxBoss*.4)dmg=Math.round(dmg*1.3);if(state.partyDamageBuffRound===state.round)dmg=Math.round(dmg*state.partyDamageBuff);state.boss=Math.max(0,state.boss-dmg);addLog('⚔️ '+p.name+' used Strike for '+dmg+' damage.');
 }else if(kind==='guard'){
  let gain=8+(p.classId==='Vanguard'?4:0);p.energy=Math.min(maxEnergy(p),(Number(p.energy)||0)+gain);p.guardBuff=p.classId==='Vanguard'&&p.subclassId==='warden';p.guardShield=20+(p.classId==='Vanguard'?15:0);addLog('🛡️ '+p.name+' guarded, restored '+gain+'⚡, and gained '+p.guardShield+' shield.');
 }else if(kind==='focus'){
  if(p.focusTurn===state.round){toast('Focus can only be used once per round.');return}let gain=20+(p.classId==='Tactician'?10:0);p.focusTurn=state.round;p.energy=Math.min(maxEnergy(p),(Number(p.energy)||0)+gain);if(p.classId==='Mystic'&&p.subclassId==='oracle'&&!p.oracleUsed){dmg=60;p.oracleUsed=true;state.boss=Math.max(0,state.boss-dmg);addLog('🔮 '+p.name+' read the future and dealt 60 damage with Focus.')}else addLog('✨ '+p.name+' focused and recovered '+gain+' energy.');
 }else{
  let sk=allSkills.find(x=>x.id===kind);if(!sk||!p.skills.includes(kind)){toast('Unlock that skill first.');return}const baseDamage=Number(sk.dmg);if(!Number.isFinite(baseDamage)||baseDamage<=0){toast(sk.name+' has an invalid damage value.');return}let cost=Number(sk.energy);if(p.classId==='Arcanist')cost=Math.max(1,Math.ceil(cost*.88));if(p.classId==='Artificer'&&p.firstSkillReady)cost=Math.max(1,cost-5);const currentEnergy=Number(p.energy)||0;if(currentEnergy<cost){toast(`Not enough energy. You have ${currentEnergy}⚡ and ${sk.name} costs ${cost}⚡.`);return}p.energy=currentEnergy-cost;const cat=sk.cat||'Productivity';let bonus=1+(p.stats[cat]||0)*.03;if(state.partyDamageBuffRound===state.round)bonus*=state.partyDamageBuff;if(p.classId==='Arcanist')bonus*=1.1;if(p.classId==='Mystic')bonus*=.85;if(p.overcharge){bonus*=1.35;p.overcharge=false;addLog('💠 '+p.name+' consumed Overcharge!');}if(p.preyMarked){bonus*=1.4*1.6;p.preyMarked=false;addLog('🎯 '+p.name+' landed a guaranteed critical on Marked Prey!');}if(p.classId==='Arcanist'&&p.subclassId==='pyromancer'&&cat==='Cooking')bonus*=1.3;if(p.classId==='Arcanist'&&p.subclassId==='scholar'&&cat==='Studying')bonus*=1.3;if(p.classId==='Mystic'&&p.subclassId==='luminary'&&cat==='Health')bonus*=1.3;if(p.classId==='Artificer'&&p.subclassId==='engineer'&&cat==='Productivity')bonus*=1.3;if(p.classId==='Artificer'&&p.subclassId==='curator'&&cat==='Cleaning')bonus*=1.3;if(p.classId==='Tactician'&&p.subclassId==='duelist')bonus*=1.05;if(p.classId==='Ranger'&&p.subclassId==='beastkeeper')p.energy=Math.min(maxEnergy(p),p.energy+4);if(p.classId==='Vanguard'&&p.guardBuff){bonus*=1.25;p.guardBuff=false}if(p.classId==='Vanguard'&&p.subclassId==='berserker'&&state.boss<=state.maxBoss*.4)bonus*=1.3;if(p.classId==='Ranger'&&p.hunterReady){bonus+=25/sk.dmg;p.hunterReady=false;addLog('🏹 '+p.name+' triggered Hunter’s Rhythm!')}if(p.classId==='Ranger'&&p.subclassId==='shadowstalker'&&Math.random()<.2)bonus*=1.6;if(p.classId==='Artificer'&&p.firstSkillReady)p.firstSkillReady=false;dmg=Math.max(1,Math.round(baseDamage*bonus));const bossBefore=state.boss;state.boss=Math.max(0,bossBefore-dmg);addLog('🔥 '+p.name+' used '+sk.name+' for '+dmg+' damage! Boss: '+bossBefore+' → '+state.boss+' HP.');
 }
 state.actedIds=Array.from(new Set([...(state.actedIds||[]),p.id]));
 updateBossPhase();
 if(state.boss===0){state.ended=true;const boss=(bosses[state.bossId]||bosses.chaos);addLog('🏆 The party defeated '+boss.name+'!');awardBossRewards();sync();renderAll();finish();return}
 const remaining=remainingAttackers();
 if(remaining.length===0){bossTurn();return}
 sync();renderAll();if(state.ended)finish()
}
function doAction(kind){if(!isHost&&ws?.readyState===WebSocket.OPEN){sendWs({type:'attack',kind,playerId:myId});return}attack(myId,kind)}
function awardBossRewards(){
  if(state.bossRewardClaimed)return;
  const boss=bosses[state.bossId]||bosses.chaos;
  const xp=Number(boss.rewardXp)||Math.max(100,Math.round(boss.maxHp*.14));
  const energy=Number(boss.rewardEnergy)||Math.max(20,Math.round(boss.maxHp*.022));
  state.bossRewardClaimed=true;
  state.players.forEach(p=>{
    const beforeLevel=p.level;
    addXp(p,xp);
    p.energy=Math.min(maxEnergy(p),(Number(p.energy)||0)+energy);
    addLog('🎁 '+p.name+' earned '+xp+' XP and '+energy+'⚡ for defeating '+boss.name+'.');
    if(p.level>beforeLevel) addLog('⬆️ '+p.name+' reached level '+p.level+' from the boss reward!');
  });
}
function finish(){showScreen('result');const victory=state.boss===0;const boss=bosses[state.bossId]||bosses.chaos;const idx=bossIds.indexOf(state.bossId);const next=bossIds[idx+1];$('resultTitle').textContent=victory?'🏆 BOSS DEFEATED':'☠️ PARTY DEFEATED';let top=[...state.players].sort((a,b)=>b.xp-a.xp)[0];$('resultText').textContent=victory?`The party defeated ${boss.name}. ${top.name} led the party with ${top.xp} XP.`:`The party was defeated by ${boss.name} with ${state.boss} HP remaining. ${top.name} led the party with ${top.xp} XP.`;$('againBtn').textContent=victory?(next?'Next Boss: '+bosses[next].name.replace('THE ',''):'Back to Home'):'Back to Home';$('againBtn').disabled=!isHost&&victory;$('againBtn').title=!isHost&&victory?'The host advances the campaign.':''}
function hostMessage(m){if(m.type==='hello'){if(state.started){return}if(!state.players.some(p=>p.id===m.id)){state.players.push(createPlayer(m.id,m.name,false,state.players.length+1));connections.get(m.connId)?.send({type:'state',state});renderLobby()}return}if(m.type==='quest')doCompleteQuest(m.playerId,m.id);if(m.type==='unlock')doUnlock(m.playerId,m.id);if(m.type==='avatar')doUpdateAvatar(m.playerId,m.icon,m.tone);if(m.type==='class')doSetClass(m.playerId,m.id);if(m.type==='subclass')doSetSubclass(m.playerId,m.id);if(m.type==='attack')attack(m.playerId,m.kind)}
function updateBossPreview(){
 const bs=$('bossSelect'); if(!bs)return;
 const id=bs.value||state.bossId||bossIds[0]; const b=bosses[id]||bosses.chaos; const idx=Math.max(0,bossIds.indexOf(id))+1;
 if($('bossPreviewImage')){$('bossPreviewImage').src=bossHeroPath(id);$('bossPreviewImage').alt=b.name+' boss artwork';}
 if($('bossPreviewOrder'))$('bossPreviewOrder').textContent='BOSS '+idx+' / '+bossIds.length;
 if($('bossPreviewName'))$('bossPreviewName').textContent=b.name;
 if($('bossPreviewStats'))$('bossPreviewStats').textContent=b.maxHp.toLocaleString()+' HP • '+b.rewardXp+' XP • '+b.rewardEnergy+'⚡';
 if($('bossPreviewDesc'))$('bossPreviewDesc').textContent=b.desc||b.subtitle;
}
function continueAfterBattle(){
 if(!isHost)return;
 if(state.boss!==0){leave();return}
 const idx=bossIds.indexOf(state.bossId); const next=bossIds[idx+1];
 if(!next){leave();return}
 const b=bosses[next]; state.bossId=next; state.boss=b.maxHp; state.maxBoss=b.maxHp; state.started=false; state.ended=false; state.log=[]; state.turnIndex=0; state.round=1; state.turnPhase='player'; state.actedIds=[]; state.bossBuff=1; state.bossPhase=1; state.lastBossMove='Waiting for the party…'; state.bossRewardClaimed=false; sync(); renderLobby();
}
function renderLobby(){showScreen('lobby');$('roomCode').textContent=roomCode;const bs=$('bossSelect');if(bs){bs.innerHTML=bossIds.map(id=>`<option value="${id}">${bosses[id].emoji} ${bosses[id].name.replace('THE ','')} — ${bosses[id].maxHp.toLocaleString()} HP</option>`).join('');bs.value=state.bossId||'chaos';bs.disabled=!isHost;bs.onchange=()=>{if(isHost){state.bossId=bs.value;const b=bosses[bs.value];state.boss=b.maxHp;state.maxBoss=b.maxHp;updateBossPreview();sync()}}}$('shareLink').value=location.protocol==='file:'?'http://localhost:3000/?room='+roomCode:location.href;updateBossPreview();$('lobbyPlayers').innerHTML=state.players.map(p=>`<div class="lobbyClass"><div><div class="name">${p.host?'👑 ':''}${(classes[p.classId]||classes.Vanguard).icon} ${esc(p.name)}</div><div class="muted">${esc((classes[p.classId]||classes.Vanguard).name)} • ${esc((classes[p.classId]||classes.Vanguard).role)} ${p.subclassId?'• '+esc(subclassById[p.subclassId].name):'• Subclass unlocks at Lv 5'}</div></div><span class="badge">Lv ${p.level}</span></div>`).join('');let mep=me();$('lobbyClassArea').innerHTML=`<div class="lobbyClass"><div><b>Your Class</b><div class="muted">${mep.classId?classes[mep.classId].icon+' '+classes[mep.classId].name:'⚔️ No class selected yet'}</div></div><button type="button" id="lobbyChooseClass" class="classBtn" style="width:auto;margin:0">${mep.classReady?'Change Class':'Choose Class'}</button></div>`;$('lobbyChooseClass').onclick=openClassModal;$('startBtn').style.display=isHost?'inline-block':'none';let ready=state.players.every(p=>p.classReady);$('startBtn').disabled=!ready;$('lobbyStatus').textContent=isHost?(ready?'Everyone has a class. Start the adventure when ready.':'Choose a class for every player before starting.'):'Choose your class, then wait for the host…'}
function start(){if(!isHost)return;if(!state.players.every(p=>p.classReady)){toast('Every player must choose a class first.');return}const id=$('bossSelect')?.value||'chaos';const b=bosses[id]||bosses.chaos;state.bossId=id;state.boss=b.maxHp;state.maxBoss=b.maxHp;state.turnIndex=0;state.turnPhase='player';state.actedIds=[];state.round=1;state.ended=false;state.bossBuff=1;state.bossPhase=1;state.lastBossMove='The battle begins!';state.bossRewardClaimed=false;state.players.forEach(p=>{ensurePlayer(p);p.maxHp=100+p.level*5+(p.stats.Health||0)*8;p.hp=p.maxHp;p.guardShield=0;p.focusTurn=null;p.taunt=false;p.overcharge=false;p.preyMarked=false;p.commandRound=0;p.abilityUsedRound=0});state.started=true;addLog('⚔️ The party entered the '+b.name+' arena. '+state.players[0].name+' goes first.');sync();showScreen('app');renderAll()}
function connectSocket(){
  if(ws && (ws.readyState===WebSocket.OPEN||ws.readyState===WebSocket.CONNECTING)) return;
  const socketUrl=location.protocol==='file:'?'ws://localhost:3000':(location.protocol==='https:'?'wss://':'ws://')+location.host;
  ws=new WebSocket(socketUrl);
  ws.onopen=()=>{
    $('roomPill').textContent='🌐 Connecting • Room: '+roomCode;
    if(isHost) sendWs({type:'host',room:roomCode});
    else sendWs({type:'join',room:roomCode,id:myId,name:myName});
  };
  ws.onmessage=(ev)=>{
    let m; try{m=JSON.parse(ev.data)}catch{return}
    if(m.type==='host_ready'){history.replaceState(null,'','?room='+roomCode);$('roomPill').textContent='🌐 Online • Room: '+roomCode;renderLobby();return}
    if(m.type==='joined'){ $('roomPill').textContent='🌐 Online • Room: '+roomCode; return }
    if(m.type==='guest_message' && isHost){
      let c=connections.get(m.connId);
      if(!c){c={open:true,send:(x)=>sendWs({type:'state',state:x.state})};connections.set(m.connId,c)}
      const msg=m.data||{}; msg.connId=m.connId; hostMessage(msg); return;
    }
    if(m.type==='state' && !isHost){
      state=structuredClone(m.state);if(!state.bossId)state.bossId='chaos';if(!state.turnPhase)state.turnPhase='player';if(!Number.isFinite(state.turnIndex))state.turnIndex=0;if(!state.round)state.round=1;if(!state.bossPhase)state.bossPhase=1;if(!Array.isArray(state.actedIds))state.actedIds=[];if(state.bossRewardClaimed==null)state.bossRewardClaimed=false;state.players.forEach(ensurePlayer);
      if(!state.started)renderLobby(); else {showScreen('app');renderAll()}
      if(state.ended)finish();
      return;
    }
    if(m.type==='error'){
      $('roomPill').textContent='⚠️ '+(m.message||'Connection error');
      toast(m.message||'Multiplayer connection error.');
    }
  };
  ws.onclose=()=>{
    if(roomCode){$('roomPill').textContent='⚠️ Disconnected • Room: '+roomCode;}
  };
  ws.onerror=()=>toast('Multiplayer connection failed. Make sure you opened the public https:// game URL.');
}
function create(){
  if(location.protocol==='file:') toast('Local file mode: start the included server first, then open http://localhost:3000');
  myName=(prompt('Your player name:')||'Player 1').slice(0,18);
  roomCode=Math.random().toString(36).slice(2,8).toUpperCase(); myId='host-'+roomCode; isHost=true;
  state=initial(); state.players=[createPlayer(myId,myName,true,1)];
  connectSocket();
}
function join(codeFromUrl){
  let code=(codeFromUrl||(prompt('Room code:')||'')).trim().toUpperCase(); if(!code)return;
  myName=(prompt('Your player name:')||'Player').slice(0,18); roomCode=code; isHost=false; myId='guest-'+Math.random().toString(36).slice(2);
  connectSocket();
}

function leave(){location.href=location.pathname}
function setView(v){view=v;document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===v));['viewGame','viewQuests','viewSkills','viewHero','viewParty'].forEach(id=>$(id).classList.toggle('hidden',id!==('view'+v.charAt(0).toUpperCase()+v.slice(1))));if(v==='game')$('viewGame').classList.remove('hidden');if(v==='quests')$('viewQuests').classList.remove('hidden');if(v==='skills')$('viewSkills').classList.remove('hidden');if(v==='party')$('viewParty').classList.remove('hidden')}
$('createBtn').onclick=create;$('joinBtn').onclick=join;$('startBtn').onclick=start;$('leaveBtn').onclick=leave;$('againBtn').onclick=continueAfterBattle;$('copyBtn').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);toast('Join link copied!')}catch{prompt('Copy this link',location.href)}};$('closeLevel').onclick=()=>$('levelUp').classList.add('hidden');$('editAvatar').onclick=openAvatar;$('closeAvatar').onclick=closeAvatar;$('cancelAvatar').onclick=closeAvatar;$('saveAvatar').onclick=saveAvatar;$('changeClass').onclick=openClassModal;$('heroChangeClass').onclick=openClassModal;$('heroChooseSubclass').onclick=openSubclassModal;$('closeClass').onclick=(e)=>{e.preventDefault();e.stopPropagation();closeClassModal()};$('cancelClass').onclick=(e)=>{e.preventDefault();e.stopPropagation();closeClassModal()};$('saveClass').onclick=(e)=>{e.preventDefault();e.stopPropagation();saveClassChoice()};$('closeSubclass').onclick=closeSubclassModal;$('cancelSubclass').onclick=closeSubclassModal;$('saveSubclass').onclick=saveSubclassChoice;document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>setView(b.dataset.view));$('basicAttack').onclick=()=>doAction('basic');$('classAbilityBtn').onclick=()=>doAction('classAbility');$('skipBtn').onclick=()=>doAction('skip');$('defendBtn').onclick=()=>doAction('guard');$('focusBtn').onclick=()=>doAction('focus');$('skillAttack').onclick=()=>{setView('skills');toast('Use an unlocked skill to attack the boss. Your energy is spent only when you attack.')};
$('bossImage').addEventListener('error',()=>{$('bossImage').classList.add('hidden');$('dragonFallback').classList.remove('hidden')});
const urlRoom=new URLSearchParams(location.search).get('room');if(urlRoom){setTimeout(()=>join(urlRoom),100)}
})();
