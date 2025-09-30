# ⚡ QUICK REFERENCE - CHEAT SHEET

## 🎯 Si të fillosh detyrën e re:

```bash
1. Shiko foton → Identifiko 2 entitetet
2. Shiko relacionin → Cili ka Foreign Key?
3. Lexo kërkesat (a, b, c, d, e)
4. Kopjo Master Template
5. Zëvendëso emrat (Find & Replace)
6. Modifiko fushat sipas kërkesës
7. Zgjedh vetëm operacionet që kërkon detyra
```

---

## 📁 File Structure (Copy-Paste Ready):

```
CREATE:
✅ models/Entity1.js
✅ models/Entity2.js
✅ repositories/Entity1Repository.js
✅ repositories/Entity2Repository.js
✅ services/Entity1Service.js
✅ services/Entity2Service.js
✅ controllers/Entity1Controller.js
✅ controllers/Entity2Controller.js
✅ routes/entity1Routes.js
✅ routes/entity2Routes.js
✅ pages/Entity1Entity2.jsx
✅ current_database/entity1_entity2.sql

UPDATE:
✅ models/index.js
✅ repositories/index.js
✅ Server.js
✅ App.jsx
```

---

## 🔤 Find & Replace (Zëvendësime):

```
Author        → YourEntity1
Book          → YourEntity2
AuthorID      → YourEntity1ID
BookID        → YourEntity2ID
author        → yourEntity1 (lowercase)
book          → yourEntity2 (lowercase)
authors       → yourEntity1s (plural)
books         → yourEntity2s (plural)
```

---

## 💾 SQL Patterns:

### CREATE TABLE (Parent)
```sql
CREATE TABLE entity1 (
    Entity1ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    IsDeleted BOOLEAN DEFAULT FALSE
);
```

### CREATE TABLE (Child)
```sql
CREATE TABLE entity2 (
    Entity2ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255),
    Entity1ID INT,  -- FOREIGN KEY
    IsDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Entity1ID) REFERENCES entity1(Entity1ID) 
        ON DELETE CASCADE ON UPDATE CASCADE
);
```

---

## 🔧 Repository Quick Patterns:

### GET ALL (basic)
```javascript
async getAll() {
    return await this.getAll({
        where: { IsDeleted: false }
    });
}
```

### GET ALL (with relation)
```javascript
async getAll() {
    return await this.getAll({
        where: { IsDeleted: false },
        include: [{
            model: RelatedModel,
            as: 'relation',
            attributes: ['ID', 'Name']
        }]
    });
}
```

### GET BY ID
```javascript
async getById(id) {
    return await this.getOneByField('EntityID', id);
}
```

### SEARCH by NAME
```javascript
async searchByName(term) {
    const { Op } = require('sequelize');
    return await this.model.findAll({
        where: {
            Name: { [Op.like]: `%${term}%` },
            IsDeleted: false
        }
    });
}
```

### SOFT DELETE
```javascript
async softDelete(id) {
    return await this.updateById(id, { IsDeleted: true });
}
```

### HARD DELETE
```javascript
async hardDelete(id) {
    return await this.deleteById(id);
}
```

### COUNT
```javascript
async count() {
    return await this.model.count({
        where: { IsDeleted: false }
    });
}
```

---

## 🎨 Frontend Quick Patterns:

### useState Setup
```javascript
const [entities, setEntities] = useState([]);
const [form, setForm] = useState({ Name: '', OtherField: '' });
const [editing, setEditing] = useState(null);
```

### useEffect Fetch
```javascript
useEffect(() => {
    fetchEntities();
}, []);

const fetchEntities = async () => {
    const res = await fetch('http://localhost:5000/api/entities');
    const data = await res.json();
    setEntities(data);
};
```

### CREATE Form
```javascript
<form onSubmit={create}>
    <input 
        value={form.Name}
        onChange={(e) => setForm({...form, Name: e.target.value})}
        required
    />
    <button type="submit">Add</button>
</form>
```

### TABLE Display
```javascript
<table>
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {entities.map(e => (
            <tr key={e.ID}>
                <td>{e.ID}</td>
                <td>{e.Name}</td>
                <td>
                    <button onClick={() => setEditing(e)}>Edit</button>
                    <button onClick={() => deleteEntity(e.ID)}>Delete</button>
                </td>
            </tr>
        ))}
    </tbody>
</table>
```

### EDIT Form (Conditional)
```javascript
{editing && (
    <form onSubmit={update}>
        <input 
            value={editing.Name}
            onChange={(e) => setEditing({...editing, Name: e.target.value})}
        />
        <button type="submit">Save</button>
        <button onClick={() => setEditing(null)}>Cancel</button>
    </form>
)}
```

### DROPDOWN (for relations)
```javascript
<select value={form.ParentID} onChange={e => setForm({...form, ParentID: e.target.value})}>
    <option value="">Select...</option>
    {parents.map(p => (
        <option key={p.ID} value={p.ID}>{p.Name}</option>
    ))}
</select>
```

---

## 🚀 Common Operations Map:

| Kërkesa | Method | SQL |
|---------|--------|-----|
| Shfaq të gjithë | `getAll()` | `SELECT * WHERE IsDeleted = 0` |
| Shfaq sipas ID | `getById(id)` | `SELECT * WHERE ID = ?` |
| Shto të ri | `create(data)` | `INSERT INTO` |
| Përditëso | `update(id, data)` | `UPDATE SET` |
| Fshi (soft) | `softDelete(id)` | `UPDATE SET IsDeleted = 1` |
| Fshi (hard) | `hardDelete(id)` | `DELETE FROM` |
| Kërko | `search(term)` | `WHERE Name LIKE '%term%'` |
| Filtro | `filter(value)` | `WHERE Field = value` |
| Numëro | `count()` | `SELECT COUNT(*)` |
| Me relacion | `include: [...]` | `INNER JOIN` |

---

## ⚠️ WARNINGS - Mos harro:

```javascript
✅ Gjithmonë shto: where: { IsDeleted: false }
✅ Në frontend: confirmation për delete
✅ Në SQL: ON DELETE CASCADE nëse kërkohet
✅ Update models/index.js
✅ Update Server.js (routes)
✅ Update App.jsx (route)
✅ Test me Postman përpara se të bësh frontend
```

---

## 🎓 Vocabulary Translation:

| Shqip | Anglisht | Kod |
|-------|----------|-----|
| Shto / Insertoj | Create | `create()` |
| Shfaq | Read | `getAll()` / `getById()` |
| Përditëso / Ndrysho | Update | `update()` |
| Fshi | Delete | `delete()` |
| Kërko | Search | `search()` |
| Filtro | Filter | `filter()` |
| Numëro | Count | `count()` |
| Relacion / Lidhje | Join | `include: [...]` |

---

## 📞 API Endpoint Pattern:

```javascript
GET    /api/entities          // Get all
GET    /api/entities/:id      // Get by ID
POST   /api/entities          // Create
PUT    /api/entities/:id      // Update
DELETE /api/entities/:id      // Delete
```

---

## ⏱️ 5-Minute Checklist për detyrë:

```
☐ Kopjo Author.js → Rename to YourEntity.js
☐ Find & Replace: Author → YourEntity
☐ Modifiko fields në model
☐ Kopjo AuthorRepository.js
☐ Zgjedh vetëm metodat që kërkon detyra
☐ Kopjo Service, Controller, Routes (minimal changes)
☐ Kopjo SQL template, modifiko CREATE TABLE
☐ Kopjo Frontend page, modifiko forms
☐ Update 4 files: models/index, repos/index, Server, App
☐ Test!
```

---

Print këtë faqe dhe mbaje pranë kur bën detyra! 📄
