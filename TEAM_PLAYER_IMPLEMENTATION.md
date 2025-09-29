# Team and Player Management System Implementation

## Overview
This implementation provides a complete CRUD system for managing Teams and Players as specified in the assignment. The system includes both backend API endpoints and frontend management interfaces.

## Database Structure

### Teams Table
- `TeamId` (INT, Primary Key, Auto Increment)
- `Name` (VARCHAR(255), Not Null)

### Players Table
- `PlayerId` (INT, Primary Key, Auto Increment)
- `Name` (VARCHAR(255), Not Null)
- `Number` (INT, Not Null)
- `BirthYear` (INT, Not Null)
- `TeamId` (INT, Foreign Key to Teams.TeamId)

## Backend Implementation

### Models
- `src/server/models/Team.js` - Team model with associations
- `src/server/models/Player.js` - Player model with team relationship

### Controllers
- `src/server/controllers/TeamController.js` - Team CRUD operations
- `src/server/controllers/PlayerController.js` - Player CRUD operations

### Repositories
- `src/server/repositories/TeamRepository.js` - Team data access layer
- `src/server/repositories/PlayerRepository.js` - Player data access layer

### Routes
- `src/server/routes/teamRoutes.js` - Team API endpoints
- `src/server/routes/playerRoutes.js` - Player API endpoints

### API Endpoints

#### Teams
- `GET /api/teams` - Get all teams
- `GET /api/teams/:id` - Get team by ID
- `POST /api/teams` - Create new team
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

#### Players
- `GET /api/players` - Get all players
- `GET /api/players/:id` - Get player by ID
- `GET /api/players/team/:teamId` - Get players by team
- `POST /api/players` - Create new player
- `PUT /api/players/:id` - Update player
- `DELETE /api/players/:id` - Delete player

## Frontend Implementation

### Pages
- `src/client/pages/Teams.jsx` - Team management interface
- `src/client/pages/Players.jsx` - Player management interface

### Features
- **Teams Management:**
  - View all teams in a table
  - Add new teams
  - Edit existing teams
  - Delete teams
  - Modal-based forms

- **Players Management:**
  - View all players with team information
  - Add new players with team selection dropdown
  - Edit existing players
  - Delete players
  - Team dropdown for player selection

### Navigation
- Added "Teams" and "Players" links to the admin navigation
- Routes configured in App.jsx for `/admin/teams` and `/admin/players`

## Sample Data
The system includes sample data as specified in the assignment:

### Teams
1. FC Barcelona (TeamId: 1)
2. Paris Saint-Germain (TeamId: 2)

### Players
1. Lionel Messi (PlayerId: 1, Number: 30, BirthYear: 1987, TeamId: 1)
2. Neymar Jr. (PlayerId: 2, Number: 10, BirthYear: 1992, TeamId: 2)
3. Kylian Mbappé (PlayerId: 3, Number: 7, BirthYear: 1998, TeamId: 2)
4. Sergio Busquets (PlayerId: 4, Number: 5, BirthYear: 1988, TeamId: 1)
5. Gerard Piqué (PlayerId: 5, Number: 3, BirthYear: 1987, TeamId: 1)
6. Marco Verratti (PlayerId: 6, Number: 6, BirthYear: 1992, TeamId: 2)

## Assignment Requirements Fulfilled

### a) Insert Teams
✅ Frontend and backend code implemented for inserting teams
✅ Sample data includes FC Barcelona and Paris Saint-Germain

### b) Insert Players
✅ Frontend and backend code implemented for inserting players
✅ Team selection dropdown implemented in frontend
✅ All sample players included

### c) Display Players
✅ Frontend interface displays all players in a table format
✅ Shows player information including team name

### d) Delete Players
✅ Delete functionality implemented with confirmation dialog
✅ Backend API endpoint for player deletion

### e) Update Teams
✅ Team update functionality implemented
✅ Frontend modal for editing team information

## How to Use

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Access the admin panel:**
   - Navigate to `/admin` in your browser
   - Login with admin credentials

3. **Manage Teams:**
   - Click "Teams" in the admin navigation
   - Add, edit, or delete teams as needed

4. **Manage Players:**
   - Click "Players" in the admin navigation
   - Add, edit, or delete players
   - Use the team dropdown when adding/editing players

## Database Setup
To set up the database tables and sample data, run the SQL script:
```sql
-- The script is located at: current_database/team_player_tables.sql
```

This script will:
- Create the `teams` and `players` tables
- Insert the sample team data
- Insert the sample player data
- Set up proper foreign key relationships

## Technical Notes
- Uses Sequelize ORM for database operations
- Implements proper error handling
- Includes form validation
- Responsive design with Tailwind CSS
- Modal-based forms for better UX
- Confirmation dialogs for delete operations
