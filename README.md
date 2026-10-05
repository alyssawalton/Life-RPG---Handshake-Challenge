# LIFE RPG --- Full Game Documentation

## 1. Game Overview

**Life RPG** is a cooperative multiplayer real-life RPG built around one
central idea:

> **Your real-world actions are your character progression.**

Players complete useful real-life quests, earn XP and Combat Energy,
level up their heroes, develop class-specific skill trees, and work
together to defeat a campaign of increasingly difficult bosses.

The bosses are personifications of real-life obstacles such as
procrastination, overthinking, deadlines, job rejection, digital
distraction, financial pressure, burnout, and anxiety.

Life RPG is intentionally designed so that the player is rewarded for
leaving the game and doing something productive in the real world.

The game combines:

-   Real-life productivity
-   RPG progression
-   Multiplayer cooperation
-   Class roles
-   Subclasses
-   Skill trees
-   Resource management
-   Turn-based combat
-   Multi-phase bosses
-   Character customization
-   Long-term progression

------------------------------------------------------------------------

# 2. Core Gameplay Loop

A normal session follows this loop:

1.  Create or join a multiplayer room.
2.  Build a hero.
3.  Review the daily Quest Board.
4.  Complete real-life quests.
5.  Earn XP and Combat Energy.
6.  Level up and spend Skill Points.
7.  Choose a subclass at the appropriate level.
8.  Enter a boss battle with the party.
9.  Coordinate class abilities and resources.
10. Defeat the boss.
11. Receive a large boss reward.
12. Progress to the next, harder boss.

The game is designed around a tradeoff between **real-life preparation**
and **combat action**.

Completing a quest during an active boss battle consumes that player's
combat turn. This creates a meaningful decision:

-   Attack now with the Energy you already have.
-   Complete a real-world quest, gain its rewards, and give up your
    action for the round.
-   Skip the turn for zero Energy cost.
-   Save resources for a more important round.

------------------------------------------------------------------------

# 3. Multiplayer

Life RPG is a browser game with a Node.js/WebSocket multiplayer server.

Multiple players can join the same room from separate devices.

The multiplayer state includes:

-   Player names
-   Classes
-   Subclasses
-   Levels
-   XP
-   Skill Points
-   Energy
-   HP
-   Defense
-   Shields
-   Quest completion
-   Boss HP
-   Boss phase
-   Combat round
-   Turn order
-   Active buffs
-   Boss progression
-   Battle results

The host controls the campaign flow and boss selection.

The game is intended to be played through a server rather than by
opening the HTML file directly.

------------------------------------------------------------------------

# 4. Running the Game

## Local Windows launch

The project includes:

``` text
start-local.bat
```

With Node.js 18 or newer installed, launch the batch file and open:

``` text
http://localhost:3000/
```

## Terminal launch

Install dependencies:

``` bash
npm install
```

Start the server:

``` bash
npm start
```

The underlying command is:

``` bash
node server.js
```

## Public deployment

For friends on different networks, deploy the Node.js project to a host
that supports WebSockets.

Typical commands:

**Build:**

``` bash
npm install
```

**Start:**

``` bash
npm start
```

The resulting service should provide an HTTPS address that players can
open on their devices.

------------------------------------------------------------------------

# 5. Important File Structure

``` text
life-rpg/
├── index.html
├── server.js
├── package.json
├── README.md
├── start-local.bat
├── check.js
└── assets/
    └── bosses/
        ├── boss hero artwork
        ├── phase I artwork
        ├── phase II artwork
        └── phase III artwork
```

## index.html

Contains the browser game:

-   Lobby
-   Character creation
-   Quest Board
-   Hero screen
-   Attributes
-   Skill Tree
-   Battle screen
-   Boss artwork
-   Combat logic
-   Multiplayer client

## server.js

Runs the multiplayer WebSocket server.

## package.json

Defines the Node.js application and its dependencies.

## start-local.bat

Convenience launcher for Windows.

## check.js

Development validation script used to inspect the generated game and
catch common structural problems.

## assets/bosses

Contains boss artwork used by the campaign and battle interface.

------------------------------------------------------------------------

# 6. Real-Life Quest System

The Quest Board converts useful real-world actions into RPG rewards.

Current quest categories:

-   **Cooking**
-   **Cleaning**
-   **Studying**
-   **Health**
-   **Productivity**

Quests have three difficulty tiers:

-   Easy
-   Medium
-   Hard

Every quest has:

-   A title
-   A category
-   A difficulty
-   XP reward
-   Energy reward
-   Completion state

The goal is to give players a menu of small, medium, and substantial
actions rather than forcing everyone into the same routine.

------------------------------------------------------------------------

# 7. Daily Quest Milestones

Players receive bonus rewards for completing multiple quests.

Current milestones:

  Quests Completed   Bonus
  ------------------ ---------
  4                  +20 XP
  8                  +40 XP
  12                 +100 XP

This creates progression both at the individual quest level and at the
daily completion level.

------------------------------------------------------------------------

# 8. Questing During Combat

Questing has a special combat rule.

When a player completes a quest while a battle is active, the player
receives the quest's normal rewards, but **the quest consumes that
player's action for the current round**.

This is an intentional strategic mechanic.

For example:

### Option A --- Attack

The player spends Energy and attacks the boss.

### Option B --- Quest

The player completes a real-life task, gains XP and Energy, but does not
perform another combat action that round.

### Option C --- Skip

The player spends **0 Energy** and intentionally skips their action.

This means players can recover resources without being forced to waste
Energy when they cannot or do not want to attack.

------------------------------------------------------------------------

# 9. XP and Leveling

The game uses an increasing XP curve.

Early levels are intentionally fast so new players experience
progression quickly.

Later levels require substantially more XP.

Leveling provides:

-   Character growth
-   Skill Points
-   Access to deeper skill trees
-   Higher HP
-   Higher Energy capacity
-   Additional specialization progression

Skill Point income increases at higher levels.

This is intended to create a long-term RPG progression system rather
than a short one-session character.

------------------------------------------------------------------------

# 10. Combat Energy

Combat Energy is the main resource used by combat abilities.

Players gain Energy from:

-   Completing quests
-   Certain class abilities
-   Boss victories
-   Other progression effects

Players must decide when to spend Energy and when to conserve it.

Energy capacity scales with level and Health mastery.

Major level milestones restore Energy.

Current major milestones include:

-   Level 5
-   Level 10
-   Level 15
-   Level 20
-   Every five levels afterward

Normal level-ups do not automatically refill Energy.

------------------------------------------------------------------------

# 11. Turn-Based Combat

Combat is divided into rounds.

Each round:

1.  Every living player receives one action.
2.  Players can act in any order.
3.  Each player can only act once.
4.  The boss acts after all living players have completed their action.
5.  A new player round begins.

The available player actions can include:

-   Basic Strike
-   Class Ability
-   Learned Skills
-   Guard/support actions
-   Skip Turn
-   Quest completion

The party has to coordinate because the boss gets its own turn after the
party finishes.

------------------------------------------------------------------------

# 12. Skip Turn

Every player has a zero-cost:

**Skip Turn**

option.

It:

-   Costs 0 Energy.
-   Consumes the player's action.
-   Does not deal damage.
-   Does not generate a combat effect.
-   Still allows the party to finish the round normally.

This prevents a player with low Energy from being forced to spend
resources simply because they need to participate in the turn cycle.

------------------------------------------------------------------------

# 13. Defense and Shields

Life RPG distinguishes between **Defense** and **Shield**.

## Defense

Defense is a percentage-based reduction to incoming boss damage.

It represents permanent character durability.

For example:

``` text
25% Defense
```

means an incoming hit is reduced before shield absorption.

## Shield

Shield is temporary protection.

A player might have:

``` text
25% Defense
45 Shield
```

The boss damage is first reduced by Defense, then the Shield absorbs as
much of the remaining damage as possible.

This creates two separate defensive mechanics.

### Defense is persistent.

### Shield is temporary.

------------------------------------------------------------------------

# 14. Tank Identity

The Vanguard is intentionally the most durable class.

Base class HP values are differentiated rather than giving every class
the same health pool.

The Vanguard has:

-   Highest starting HP
-   Highest HP growth
-   Highest base Defense
-   Strong shield scaling
-   Boss targeting control

This makes the Vanguard a genuine tank rather than a normal damage class
with a shield button.

------------------------------------------------------------------------

# 15. Classes

Life RPG currently has six classes.

Each class has a distinct role.

The objective is for classes to solve different problems rather than
being six versions of a DPS character.

------------------------------------------------------------------------

# 16. Vanguard --- Tank / Protector

The Vanguard is the frontline defender.

Primary responsibilities:

-   Absorb damage
-   Control boss targeting
-   Protect allies
-   Generate shields
-   Reduce incoming damage
-   Create safe openings for the party

The Vanguard has the highest HP and Defense.

### Passive --- Iron Resolve

Provides:

-   Increased maximum HP
-   Increased Defense
-   Stronger Guard/Shield effects

### Class Ability --- Taunt

Taunt:

-   Creates a shield
-   Forces the boss toward the Vanguard
-   Reduces the next incoming boss hit

This gives the party a reliable method of controlling dangerous
single-target attacks.

------------------------------------------------------------------------

# 17. Vanguard Subclasses

## Warden

The Warden is the pure defensive specialization.

Focus:

-   Party protection
-   Stronger shields
-   Defense
-   Damage mitigation
-   Ally protection

The Warden is ideal for parties that need to survive powerful bosses.

## Berserker

The Berserker is a bruiser tank.

Focus:

-   Remaining durable while wounded
-   Counterattacking
-   Converting missing HP into offensive pressure
-   Maintaining frontline control

Unlike a pure DPS class, the Berserker retains the Vanguard's
durability.

------------------------------------------------------------------------

# 18. Arcanist --- Mage / Resource Controller

The Arcanist is a spellcaster focused on manipulating the party's
resources and combat tempo.

Primary responsibilities:

-   Energy management
-   Spell enhancement
-   Magical control
-   Weakness exploitation
-   Resource generation

### Passive --- Arcane Flow

Combat skills cost less Energy.

Focus effects restore additional Energy.

### Class Ability --- Overcharge

Empowers the next appropriate damaging or offensive skill and can refund
Energy afterward.

The Arcanist therefore revolves around timing powerful abilities rather
than simply using the highest-damage button every round.

------------------------------------------------------------------------

# 19. Arcanist Subclasses

## Pyromancer

Focus:

-   Burn effects
-   Fire-based abilities
-   Tempo
-   Resource generation

The Pyromancer is the more aggressive Arcanist specialization.

## Scholar

Focus:

-   Studying mastery
-   Energy generation
-   Weakness discovery
-   Party empowerment
-   Tactical spell use

The Scholar is the more utility-oriented Arcanist.

------------------------------------------------------------------------

# 20. Ranger --- Scout / Precision Striker

The Ranger is a mobile battlefield specialist.

Primary responsibilities:

-   Mark targets
-   Create openings
-   Improve party accuracy
-   Evade dangerous attacks
-   Provide scouting utility
-   Use companion or stealth mechanics

### Passive --- Hunter's Rhythm

Completing a quest primes the Ranger's next Ranger skill.

This connects real-life questing directly to the Ranger's combat
identity.

### Class Ability --- Mark Prey

Marks the boss.

The next Ranger skill against that target gains increased effect power
and restores Energy.

The Ranger therefore specializes in preparation and execution rather
than generic damage spam.

------------------------------------------------------------------------

# 21. Ranger Subclasses

## Beastkeeper

Focus:

-   Companion abilities
-   Ally healing
-   Ally shielding
-   Energy generation
-   Sustained utility

## Shadowstalker

Focus:

-   Stealth
-   Evasion
-   Mark manipulation
-   Critical openings
-   High-risk attacks

------------------------------------------------------------------------

# 22. Tactician --- Buffer / Controller

The Tactician is the party commander.

Primary responsibilities:

-   Buff teammates
-   Weaken bosses
-   Manipulate combat tempo
-   Distribute Energy
-   Create favorable turns
-   Coordinate party strategy

### Passive --- Prepared Mind

Improves Focus Energy recovery and allows Tactician support effects to
persist for the relevant combat round.

### Class Ability --- Command

Command:

-   Increases party effectiveness for the round
-   Restores Energy to allies

This makes the Tactician especially valuable in coordinated multiplayer
groups.

------------------------------------------------------------------------

# 23. Tactician Subclasses

## Duelist

Focus:

-   Single-target pressure
-   Ripostes
-   Tempo
-   Defensive reactions
-   Counterattacks

## Battlechemist

Focus:

-   Energy distribution
-   Shields
-   Temporary enhancements
-   Party-wide potion effects
-   Quest reward optimization

------------------------------------------------------------------------

# 24. Mystic --- Healer / Support

The Mystic is the primary healer.

Primary responsibilities:

-   Restore HP
-   Provide shields
-   Cleanse negative effects
-   Stabilize wounded allies
-   Keep the party alive

### Class Ability --- Heal

Targets the ally who needs help most.

It restores HP and provides additional protection.

This makes the Mystic valuable even when the party is not dealing
maximum damage.

------------------------------------------------------------------------

# 25. Mystic Subclasses

## Oracle

Focus:

-   Prediction
-   Fate manipulation
-   Utility
-   Damage prevention
-   Tactical support

## Luminary

Focus:

-   Stronger healing
-   Radiant protection
-   Party recovery
-   Emergency stabilization

------------------------------------------------------------------------

# 26. Artificer --- Utility / Shield Support

The Artificer is the engineering and infrastructure class.

Primary responsibilities:

-   Shields
-   Defensive systems
-   Energy infrastructure
-   Repairs
-   Drones
-   Utility effects

### Class Ability --- Barrier Array

Creates shields for the living party.

The Curator specialization improves the amount of shielding provided.

The Artificer is intended to solve problems through preparation and
systems rather than direct damage.

------------------------------------------------------------------------

# 27. Artificer Subclasses

## Engineer

Focus:

-   Drones
-   Turrets
-   Mechanical utility
-   Automated support
-   Sustained battlefield infrastructure

## Curator

Focus:

-   Cleaning mastery
-   Relics
-   Defensive tools
-   Restoration
-   Protective collections

Curator effects are connected to Cleaning quest mastery.

------------------------------------------------------------------------

# 28. Skill Tree System

The skill tree is intentionally larger than a simple three-skill
progression.

Each class contains:

-   Core skills
-   A specialization choice
-   A deeper specialization branch
-   Prerequisites
-   Skill Point costs
-   Increasingly powerful late-game abilities

The goal is to make the player's build meaningful.

Players should eventually ask:

> "What kind of Vanguard am I?"

rather than:

> "Which class does the most damage?"

------------------------------------------------------------------------

# 29. Class Identity Rules

The class system follows these design principles:

### Tanks

Should survive.

### Healers

Should keep people alive.

### Buffers

Should make the party stronger.

### Controllers

Should manipulate the fight.

### Utility classes

Should solve problems through resources and preparation.

### Damage specialists

Should provide focused damage when their role calls for it.

Damage is intentionally not the only measure of usefulness.

------------------------------------------------------------------------

# 30. Real-Life Mastery

The game tracks mastery through quest categories.

Categories include:

-   Cooking
-   Cleaning
-   Studying
-   Health
-   Productivity

This allows the player's real-world behavior to influence their RPG
identity.

Examples:

### Scholar

Studying mastery improves Scholar utility.

### Curator

Cleaning mastery improves Curator abilities.

### Ranger

Completing quests primes Ranger effects.

### Battlechemist

Quest Energy rewards can become more valuable.

The long-term goal is for the player's real-life habits to create a
recognizable character build.

------------------------------------------------------------------------

# 31. Boss Campaign

The current campaign contains ten bosses.

They are arranged from introductory challenge to major endgame
challenge.

    \# Boss                    Theme                      HP      XP   Energy
  ---- ----------------------- --------------------- ------- ------- --------
     1 Chaos Dragon            Chaos                   2,000     150       25
     2 Procrastinator          Delay                   2,400     225       35
     3 Overthinking Overlord   Overthinking            2,800     325       50
     4 Deadline Demon          Time pressure           3,200     450       70
     5 Rejection Reaper        Job hunting             3,600     600       90
     6 Doomscroller            Digital distraction     4,200     700      100
     7 Comfort Zone            Avoiding growth         5,000     800      115
     8 Debt Dragon             Financial pressure      5,800     900      130
     9 Burnout Beast           Overwork                6,500   1,050      150
    10 Anxiety Hydra           Anxiety and fear        7,500   1,250      175

Every boss is designed to be more demanding than the previous one.

------------------------------------------------------------------------

# 32. Boss Phases

Bosses use three phases.

## Phase I

The boss uses its standard move set.

## Phase II

At approximately half HP:

-   New attacks become available.
-   Boss damage increases.
-   Mechanics become more dangerous.

## Phase III

At approximately one-third HP:

-   The strongest attacks become available.
-   Boss damage increases again.
-   The final stage becomes significantly more dangerous.

The boss does not return to an earlier phase after entering a later
phase.

------------------------------------------------------------------------

# 33. Boss Artwork

Each boss has dedicated artwork.

The campaign includes:

-   Hero/roster artwork
-   Phase I artwork
-   Phase II artwork
-   Phase III artwork

Boss artwork changes as the fight progresses.

High-resolution boss hero assets are included for major boss displays.

Artwork is stored under:

``` text
assets/bosses/
```

The battle interface is designed to display the full artwork rather than
aggressively crop it.

------------------------------------------------------------------------

# 34. Boss Themes

## Chaos Dragon

Represents uncertainty and disorder.

## Procrastinator

Represents putting important work off until later.

## Overthinking Overlord

Represents analysis paralysis and endless mental loops.

## Deadline Demon

Represents time pressure and last-minute panic.

## Rejection Reaper

Represents job applications, rejection emails, interviews, and career
uncertainty.

## Doomscroller

Represents endless digital distraction and lost attention.

## Comfort Zone

Represents avoiding difficult but useful growth.

## Debt Dragon

Represents financial pressure and compounding consequences.

## Burnout Beast

Represents the consequences of overworking without recovery.

## Anxiety Hydra

Represents a collection of fears that seem to multiply when one problem
is addressed.

------------------------------------------------------------------------

# 35. Boss Rewards

Defeating a boss grants the entire party:

-   XP
-   Combat Energy
-   Campaign progression

Later bosses provide significantly larger rewards.

This means boss victories help prepare the party for increasingly
difficult encounters.

------------------------------------------------------------------------

# 36. Attributes

Characters expose important combat information such as:

-   HP
-   Max HP
-   Energy
-   Max Energy
-   Defense
-   Active Shield
-   Level
-   XP
-   Skill Points
-   Quest mastery

The goal is to make the character's actual combat identity visible
rather than hiding important statistics.

------------------------------------------------------------------------

# 37. Character Progression

A player's long-term character can be shaped by:

-   Class
-   Subclass
-   Skill choices
-   Quest completion
-   Quest category mastery
-   Level
-   Skill Points
-   Energy management
-   Combat performance

This means two players using the same class can eventually have
meaningfully different characters.

------------------------------------------------------------------------

# 38. Party Composition

A six-player party can potentially contain all six roles.

A balanced party might include:

-   Vanguard --- protects everyone
-   Mystic --- heals
-   Tactician --- buffs and controls
-   Artificer --- shields and utility
-   Ranger --- scouting and precision
-   Arcanist --- magical control and resource management

A smaller party can use fewer roles and compensate through different
builds.

There is no requirement that every class be present.

------------------------------------------------------------------------

# 39. Strategy

The game rewards coordination.

Examples:

### Tank + Healer

The Vanguard absorbs attacks while the Mystic stabilizes the team.

### Tactician + Arcanist

The Tactician creates a powerful round while the Arcanist manipulates
Energy and spell timing.

### Ranger + Tactician

The Tactician creates an opening and the Ranger capitalizes on a marked
target.

### Artificer + Vanguard

The Artificer supplies shields while the Vanguard controls boss
targeting.

### Quest + Combat

A player can sacrifice their combat action to complete a quest and
refill resources for later rounds.

The strongest party is not necessarily the party with the highest raw
damage.

------------------------------------------------------------------------

# 40. Design Philosophy

Life RPG is designed around the idea that productivity should produce
visible progression.

The game should encourage:

-   Action instead of avoidance
-   Consistency instead of one-time bursts
-   Cooperation instead of isolated grinding
-   Strategic resource use instead of button spam
-   Different strengths instead of identical characters

The game is deliberately built so that the most valuable progression
happens when the player is not staring at the screen.

------------------------------------------------------------------------

# 41. Technical Architecture

The game uses a lightweight browser client and Node.js/WebSocket server.

## Frontend

The main client is:

``` text
index.html
```

It contains the game UI and client-side game systems.

## Backend

The multiplayer server is:

``` text
server.js
```

It uses WebSockets to synchronize rooms and game state.

## Dependency

The project uses the `ws` package.

The package configuration is stored in:

``` text
package.json
```

------------------------------------------------------------------------

# 42. Development Validation

The project includes:

``` text
check.js
```

This can be used during development to validate the project and inspect
common structural issues.

Before distributing a build, the important files should be checked for:

-   JavaScript syntax errors
-   Missing assets
-   Broken server configuration
-   Incorrect paths
-   Missing package configuration

------------------------------------------------------------------------

# 43. Deployment Requirements

The production server needs:

-   Node.js 18+
-   npm
-   WebSocket support
-   HTTP/HTTPS serving
-   A public network address for multiplayer

GitHub Pages by itself is not sufficient for multiplayer because it
cannot run the Node.js WebSocket server.

A service capable of running the Node process should be used for public
multiplayer.

------------------------------------------------------------------------

# 44. Current Feature Summary

Life RPG currently includes:

-   Multiplayer rooms
-   Real-life daily quests
-   Five quest categories
-   Three quest difficulties
-   XP progression
-   Energy progression
-   Daily quest milestones
-   Six RPG classes
-   Twelve subclasses
-   Expanded skill trees
-   Class-specific roles
-   Class passives
-   Class abilities
-   Defense system
-   Shield system
-   Turn-based combat
-   Zero-cost Skip Turn
-   Quest-as-a-combat-action mechanic
-   Three-phase bosses
-   Ten campaign bosses
-   Increasing boss difficulty
-   Boss XP and Energy rewards
-   Boss artwork
-   Phase artwork
-   Avatar customization
-   Quest mastery
-   Multiplayer state synchronization
-   Local Windows launcher

------------------------------------------------------------------------

# 45. Recommended Future Expansion

The existing systems provide a foundation for much larger RPG mechanics.

Potential additions include:

## Equipment

Weapons, armor, accessories, and class-specific gear.

## Loot

Bosses could drop unique items.

## Achievements

Examples:

-   Complete 100 quests
-   Defeat a boss without anyone dying
-   Finish a boss with zero Energy
-   Complete every category in one day

## Weekly Challenges

Longer-term real-life objectives could provide special rewards.

## Guilds

Multiple parties could work toward shared goals.

## Raid Bosses

Large encounters could require coordinated parties.

## More Classes

Future roles could include:

-   Bard
-   Druid
-   Monk
-   Necromancer
-   Paladin
-   Alchemist

## More Real-Life Systems

Potential categories:

-   Finance
-   Sleep
-   Organization
-   Social goals
-   Career development
-   Creative work

------------------------------------------------------------------------

# 46. The Core Idea

Life RPG is ultimately built around a simple relationship:

**Real-world effort → RPG resources → Character growth → Cooperative
challenge**

The player improves the character by improving something in real life.

The party becomes stronger by helping one another.

The bosses represent obstacles that players recognize outside the game.

The ultimate goal is not simply to win a virtual battle.

It is to make the real-world action that powered the battle feel
rewarding.

------------------------------------------------------------------------

# 47. Project Tagline

> **REAL QUESTS. REAL CHALLENGES. A BETTER YOU.**

Life RPG turns everyday progress into an RPG adventure.
