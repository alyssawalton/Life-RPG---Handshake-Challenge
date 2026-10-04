LIFE RPG

Life RPG is a multiplayer real-life role-playing game where everyday
accomplishments become RPG progression.

Instead of grinding monsters by repeatedly clicking a button, players
complete real-world quests---such as studying, cleaning, exercising,
cooking, or finishing an avoided task---to earn XP and Combat
Energy. They then bring that progress into a shared turn-based boss
battle with friends.

The goal is simple:

Do something useful in real life. Get stronger in the game. Work
together to defeat the problem.

1. What is Life RPG?

Life RPG turns personal productivity into a cooperative fantasy RPG.

A typical session looks like this:

A player creates a multiplayer room.

Friends join from their own devices.

Everyone creates or chooses their hero.

Players complete real-life quests from the Quest Board.

Completed quests award XP and Combat Energy.

XP raises the hero's level and unlocks skill points.

Players spend their Combat Energy on combat abilities.

The whole party fights a shared boss.

The boss changes tactics as its HP falls through three phases.

Defeating the boss grants a large XP and Energy reward.

The party progresses to the next, harder boss.

The bosses are deliberately themed around real-life obstacles:
procrastination, overthinking, deadlines, job rejection, digital
distraction, financial pressure, burnout, anxiety, and other challenges.

2. Multiplayer

Life RPG is designed as a real multiplayer game rather than a
single-player mockup.

Players join the same room using a room code and can participate from
separate devices.

The server synchronizes the important shared game state, including:

Party members

Player names

Classes and subclasses

Levels

XP

Combat Energy

HP

Shields

Quest progress

Boss HP

Boss phase

Combat turns

Battle results

Boss progression

The host controls the room's campaign flow and boss progression.

Important

For multiplayer, Life RPG must be served through the included Node.js
server.

Do not double-click index.html and expect multiplayer to work.
Opening the page with a file:// URL does not provide the WebSocket
server required by the game.

For local testing on Windows, use:

start-local.bat

Then open:

http://localhost:3000/

For public multiplayer, deploy the Node.js application to a host that
supports WebSockets.

3. The Core Game Loop

Life RPG has two connected halves:

Real Life

Players complete useful activities.

Examples:

Make breakfast

Prepare a snack

Cook a complete meal

Clean a room

Organize a drawer

Read 10 pages

Study for 30 focused minutes

Complete practice problems

Take a walk

Stretch

Exercise

Write tomorrow's priorities

Finish an important task

Complete a task that has been avoided

RPG

Those accomplishments become character progression.

Completing quests can provide:

XP

Combat Energy

Quest milestones

Class-specific benefits

Progress toward level-ups

Resources for boss battles

The result is a loop where the player's real-world effort directly feeds
the game's progression.

4. Quest Board

The Quest Board contains daily real-life challenges.

Quests are organized into five categories:

Cooking

Cleaning

Studying

Health

Productivity

They are also separated by difficulty:

Easy

Small actions that are easy to complete.

Typical reward:

10 XP

5 Energy

Medium

More meaningful tasks requiring focused effort.

Typical reward:

25 XP

10 Energy

Hard

Larger challenges that require sustained effort or overcoming
resistance.

Typical reward:

50 XP

16 Energy

The game presents a daily selection of quests so players have a variety
of useful actions to choose from.

5. Quest Milestones

Players can earn additional rewards by completing multiple quests.

Daily milestones include:

4 quests: +20 XP

8 quests: +40 XP

12 quests: +100 XP

This creates a second progression layer beyond individual quest rewards.

The system is intended to encourage consistency rather than requiring
players to complete one enormous task.

6. XP and Leveling

Life RPG uses a deliberately increasing XP curve.

Early levels are relatively accessible so new players can quickly feel
progression.

Later levels require significantly more XP, creating a longer-term RPG
progression curve.

Leveling up can provide:

Increased character progression

Skill Points

Access to more powerful abilities

New specialization choices

Long-term build development

Skill Points become more generous at higher levels.

Major level milestones also restore Combat Energy.

Energy restoration occurs at:

Level 5

Level 10

Level 15

Level 20

Every five levels afterward

Normal level-ups do not automatically reset the player's Energy.

This means players have to manage their combat resources instead of
being able to spend everything immediately before every level-up.

7. Combat Energy

Combat Energy is the main resource used during boss battles.

Players earn Energy through real-life quests and other progression
rewards.

Combat skills consume Energy.

This creates an important strategic connection:

The more useful things you accomplish in real life, the more
resources you have available for the fight.

Players therefore have to decide whether to:

Save Energy for stronger skills

Spend Energy on efficient attacks

Use support abilities

Protect weaker teammates

Prepare for a boss's later phases

Boss victories also provide Energy rewards.

8. Turn-Based Boss Combat

Combat is cooperative and turn-based.

Each round follows this structure:

Every living player gets one action.

Players may act in any order.

Each player can act only once during the round.

After all players have acted, the boss takes its turn.

The next round begins.

This means the party has to coordinate.

A player might:

Attack

Use a class ability

Use a skill

Heal another player

Shield the team

Buff the party

Control the boss's attention

The party's objective is to defeat the boss before the boss defeats the
team.

9. Boss Phases

Every major boss has three phases.

Phase I --- 100% to 50% HP

The boss uses its standard attacks.

This phase teaches the party the boss's basic behavior.

Phase II --- 50% to above one-third HP

The boss changes its attack pool.

It becomes more dangerous and introduces new mechanics.

Phase III --- One-third HP and below

The boss enters its final form.

Its most dangerous attacks become available and its damage increases.

Boss phases do not simply reset when the boss changes tactics. The fight
continues toward its final defeat.

This gives every boss a dramatic escalation instead of making it feel
like a large health bar.

10. Boss Campaign

The bosses are arranged as a campaign.

Each victory unlocks the next challenge.

The current campaign order is:

1. The Chaos Dragon

Theme: Chaos and uncertainty

The introductory boss.

It teaches the basic combat system and introduces:

Single-target attacks

Area attacks

Boss buffs

Phase changes

Reward: 150 XP + 25 Energy

2. The Procrastinator

Theme: Putting things off

This boss represents the temptation to delay important work.

It can:

Attack individual heroes

Steal Energy

Heal itself

Become more dangerous when the fight drags on

Reward: 225 XP + 35 Energy

3. The Overthinking Overlord

Theme: Analysis paralysis

The Overthinking Overlord turns uncertainty into a weapon.

Its mechanics include:

Mental damage

Energy drain

Empowered attacks

Party-wide mental pressure

Reward: 325 XP + 50 Energy

4. The Deadline Demon

Theme: Time pressure

The Deadline Demon represents the panic of waiting until the last
possible moment.

Its attacks become increasingly aggressive as the battle progresses.

Reward: 450 XP + 70 Energy

5. The Rejection Reaper

Theme: Job hunting and career rejection

The Rejection Reaper represents:

Resume rejection

Applicant tracking systems

Ghosting

Awkward interviews

Salary negotiations

Rescinded offers

Its attacks include:

ATS Scanner

Ghosted

Awkward Interview

Resume Rejection

Salary Negotiation

Final Interview

Offer Rescinded

Hiring Freeze

Reward: 600 XP + 90 Energy

6. The Doomscroller

Theme: Digital distraction

The Doomscroller feeds on attention.

It represents:

Endless feeds

Notifications

Clickbait

Fear of missing out

Autoplay

Lost time

Its attacks can damage players while draining Combat Energy.

Reward: 700 XP + 100 Energy

7. The Comfort Zone

Theme: Avoiding growth

The Comfort Zone is not necessarily dangerous because it attacks
immediately.

It is dangerous because it convinces the player not to push themselves.

Its abilities represent:

Comfort

Stagnation

Fear of failure

Avoiding challenges

Opportunity cost

Reward: 800 XP + 115 Energy

8. The Debt Dragon

Theme: Financial pressure

The Debt Dragon introduces the idea of compounding pressure.

Its attacks include:

Interest Claw

Debt Avalanche

Financial Drain

Compound Interest

Late Fee

Bankruptcy

Interest Spiral

Collection Notice

The longer the fight continues, the more threatening the theme becomes.

Reward: 900 XP + 130 Energy

9. The Burnout Beast

Theme: Overwork and exhaustion

The Burnout Beast grows around the idea that constantly pushing without
recovering has a cost.

It can:

Attack individual players

Damage the entire party

Drain Energy

Recover HP

Become extremely dangerous in its final phase

Reward: 1,050 XP + 150 Energy

10. The Anxiety Hydra

Theme: Fear, uncertainty, and endless "what if?" thinking

The final boss currently represents anxiety as a many-headed creature.

Each head represents another fear.

The Hydra's mechanics include:

Multi-Head Strike

Fear Spread

Regeneration

More Heads

What If?

Worst Case

No Escape

Full Hydra

The boss becomes increasingly difficult as more fears emerge.

Reward: 1,250 XP + 175 Energy

The Anxiety Hydra is designed to be the current campaign's ultimate
challenge.

11. Boss Artwork

Each boss has dedicated artwork.

Every boss has:

A main hero/roster image

Phase I artwork

Phase II artwork

Phase III artwork

During combat, the displayed artwork changes as the boss enters its
later phases.

This makes the phase transition visually meaningful instead of only
changing numbers behind the scenes.

Boss artwork is stored under:

assets/bosses/

The game loads images using the boss ID and phase number.

12. Character Classes

Players choose from six original RPG classes.

Each class has a distinct role.

Vanguard

Role: Tank / Protector

The Vanguard is the party's frontline defender.

Strengths:

Damage mitigation

Shields

Boss control

Protection

Signature ability:

Taunt

The Vanguard gains a large shield and forces the boss to target them
while reducing the incoming hit.

Subclasses

Warden

A dedicated protector focused on stronger defense and counterattacks.

Berserker

A tank that becomes increasingly dangerous as the boss gets closer to
defeat.

13. Arcanist

Role: DPS / Burst Caster

The Arcanist specializes in magical burst damage.

Signature ability:

Overcharge

Empowers the next damaging skill.

Subclasses

Pyromancer

Specializes in Cooking-themed fire abilities.

Scholar

Specializes in Studying and knowledge-based power.

14. Ranger

Role: DPS / Critical Striker

The Ranger is a precision damage dealer.

Signature ability:

Mark Prey

Marks the boss and makes the Ranger's next damaging attack significantly
stronger with a guaranteed critical hit.

Subclasses

Beastkeeper

Uses a companion and sustainable damage.

Shadowstalker

Focuses on high-risk, high-reward critical attacks.

15. Tactician

Role: Buffer / Controller

The Tactician focuses on party coordination.

Signature ability:

Command

The entire party gains increased damage for the round and additional
Energy.

Subclasses

Duelist

A tactical single-target damage specialist.

Battlechemist

A resource-focused support specialist.

16. Mystic

Role: Healer / Support

The Mystic keeps the party alive.

Signature ability:

Heal

Restores the lowest-health ally and provides additional protection.

Subclasses

Oracle

A predictive support character that can turn utility into offense.

Luminary

A stronger healing and Health-focused specialization.

17. Artificer

Role: Utility / Shield Support

The Artificer creates defensive systems and provides reliable party
utility.

Signature ability:

Barrier Array

Places shields across the party.

Subclasses

Engineer

Converts Productivity progress into mechanical damage.

Curator

Focuses on Cleaning-based abilities and defensive preparation.

18. Skill Trees

Every class has its own skill tree.

The trees contain:

Core abilities

Two specialization branches

Increasing Energy costs

Increasing Skill Point costs

Prerequisites

Stronger abilities deeper in each branch

Players therefore develop their heroes rather than simply receiving a
fixed list of attacks.

The build system allows different players in the same party to
specialize in different jobs.

For example:

A Vanguard can focus on protection.

An Arcanist can focus on burst damage.

A Mystic can focus on healing.

A Tactician can focus on party buffs.

A Ranger can specialize in critical strikes.

An Artificer can focus on shields and utility.

19. Subclasses

At Level 5, players choose a subclass.

This is intended to be a major character-development moment.

A subclass changes how the player's class performs rather than simply
adding another cosmetic title.

Examples:

Vanguard → Warden or Berserker

Arcanist → Pyromancer or Scholar

Ranger → Beastkeeper or Shadowstalker

Tactician → Duelist or Battlechemist

Mystic → Oracle or Luminary

Artificer → Engineer or Curator

This creates multiple possible builds within the same class.

20. Avatar Customization

Players can customize the hero other players see in the party.

The avatar system includes:

Multiple hero icons

Multiple visual themes

Player-specific appearance

Party display

This gives multiplayer sessions a stronger sense of individual identity.

21. Party Coordination

The game is intentionally designed so that different roles matter.

A strong party might contain:

A Vanguard protecting everyone

An Arcanist dealing burst damage

A Ranger finishing weakened bosses

A Tactician increasing team damage

A Mystic healing the party

An Artificer maintaining shields

The party does not have to use every class.

Players can experiment with different compositions and builds.

22. Boss Difficulty Progression

The campaign is designed to become progressively harder.

Bosses increase in:

Maximum HP

Attack damage

Attack complexity

Healing

Energy disruption

Area damage

Phase danger

Reward value

The current progression is:

Boss                         HP      XP   Energy

Chaos Dragon              2,000     150       25
Procrastinator            2,400     225       35
Overthinking Overlord     2,800     325       50
Deadline Demon            3,200     450       70
Rejection Reaper          3,600     600       90
Doomscroller              4,200     700      100
Comfort Zone              5,000     800      115
Debt Dragon               5,800     900      130
Burnout Beast             6,500   1,050      150
Anxiety Hydra             7,500   1,250      175

The intention is for early bosses to teach the game and later bosses to
test whether the party has developed strong characters and good
teamwork.

23. Why the Game Works

Life RPG is built around a simple psychological loop:

Action → Reward → Progress → Challenge → Achievement

A player completes something useful.

That action produces an immediate in-game reward.

The reward improves the character.

The stronger character allows the player to attempt a harder boss.

The harder boss creates another reason to complete more real-life
quests.

This turns everyday activities into visible RPG progression.

24. Design Philosophy

Life RPG is not intended to replace real productivity with another
digital distraction.

The game is designed so that the game becomes more rewarding when the
player leaves the screen and actually does something.

The most important resource in the game is therefore not gold.

It is real-world effort.

The game treats things such as:

Studying

Cleaning

Exercise

Cooking

Planning

Finishing difficult tasks

as legitimate RPG achievements.

25. Technical Architecture

Life RPG is a browser-based application with a Node.js multiplayer
server.

Frontend

The primary game interface is contained in:

index.html

It contains:

Game UI

Quest system

Character system

Skill trees

Boss battle interface

Multiplayer client

Avatar customization

Boss artwork integration

Server

The multiplayer server is:

server.js

The server uses:

Node.js
WebSocket (ws)

Package

Dependencies and startup configuration are stored in:

package.json

Local launcher

Windows users can use:

start-local.bat

26. Running Locally

Install Node.js 18 or newer.

Then open a terminal in the project directory and run:

npm install
npm start

The server will listen on the configured port, defaulting to:

3000

Open:

http://localhost:3000/

On Windows, the included batch file can also start the game:

start-local.bat

27. Public Multiplayer Deployment

To let players on different networks join the same game, deploy the
Node.js application to a public host that supports WebSockets.

A typical deployment uses:

Build command

npm install

Start command

npm start

The public service should provide an HTTPS URL.

Players can then open the public game URL and use the room system to
play together.

28. Project Structure

A typical project contains:

life-rpg/
├── index.html
├── server.js
├── package.json
├── start-local.bat
├── README.md
└── assets/
    └── bosses/
        ├── chaos-hero.png
        ├── chaos-phase1.png
        ├── chaos-phase2.png
        ├── chaos-phase3.png
        ├── procrastinator-hero.png
        ├── procrastinator-phase1.png
        ├── ...
        ├── anxiety-hero.png
        ├── anxiety-phase1.png
        ├── anxiety-phase2.png
        └── anxiety-phase3.png

29. The Long-Term Vision

Life RPG can eventually become much larger than its current campaign.

Potential future systems include:

More bosses based on real-life challenges

Weekly campaigns

Guilds

Party achievements

Boss leaderboards

More classes

More subclasses

Equipment

Cosmetics

Crafting

Seasonal events

Friend lists

Persistent player accounts

Achievement systems

Boss-specific quest modifiers

Real-world streak rewards

Cooperative raid bosses

More sophisticated boss mechanics

The central idea should remain the same:

Your real life is the grind. Your character is the reward. Your
party is your support system.

30. Project Summary

Life RPG is a cooperative multiplayer RPG that turns real-world
productivity into character progression.

Players:

Complete real-life quests

Earn XP and Combat Energy

Level up

Spend Skill Points

Choose classes

Choose subclasses

Build skill trees

Coordinate with friends

Fight multi-phase bosses

Unlock increasingly difficult challenges

The game combines productivity, RPG progression, cooperative combat, and
personal challenges into one system.

Real quests. Real challenges. A better you.
