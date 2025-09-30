# 📖 MASTER OPERATIONS GUIDE

## Si ta përdorësh këtë template për çdo detyrë

### HAPI 1: Identifiko entitetet
```
Shembull nga detyra jote:
- Planet & Satellite
- Team & Player
- Employee & Contract
- Author & Book  ← Master template
```

### HAPI 2: Zëvendëso emrat
```javascript
// Në çdo file zëvendëso:
Author   →  YourEntity1Name   (p.sh. Planet, Team, Employee)
Book     →  YourEntity2Name   (p.sh. Satellite, Player, Contract)
AuthorID →  YourEntity1IDName (p.sh. PlanetID, TeamId, etc.)
BookID   →  YourEntity2IDName (p.sh. SatelliteID, PlayerId, etc.)
```

### HAPI 3: Modifiko fushat
```javascript
// Author fields:
Name, Email, Country, IsDeleted, IsActive
↓
Zëvendësoi me fushat që kërkon detyra jote

// Book fields:
Title, Description, PublishYear, Price, ISBN, AuthorID
↓
Zëvendësoi me fushat që kërkon detyra jote
```

### HAPI 4: Zgjedh operacionet e nevojshme

#### A. CRUD BAZIK (Gjithmonë i nevojshëm)
```javascript
✅ getAllAuthors()        // READ all
✅ getAuthorById(id)      // READ by ID
✅ createAuthor(data)     // CREATE
✅ updateAuthor(id, data) // UPDATE
✅ softDeleteAuthor(id)   // DELETE (soft)
   ose
✅ hardDeleteAuthor(id)   // DELETE (hard)
```

#### B. FILTRIMI & KËRKIMI (Sipas nevojës)
```javascript
// Nëse kërkon: "Shfaq autorët e fshirë"
✅ getDeletedAuthors()

// Nëse kërkon: "Kërko sipas emrit"
✅ searchByName(term)

// Nëse kërkon: "Filtro sipas vendit/kategorisë"
✅ filterByCountry(country)

// Nëse kërkon: "Shfaq vetëm aktivët"
✅ getActiveAuthors()

// Nëse kërkon: "Shfaq autorët që kanë libra"
✅ getAuthorsWithBooks()
```

#### C. COUNTING & STATISTICS (Sipas nevojës)
```javascript
// Nëse kërkon: "Sa autorë ka?"
✅ countAuthors()

// Nëse kërkon: "Sa libra ka autori X?"
✅ countBooksByAuthor(authorId)
```

#### D. OPERACIONE TË AVANCUARA (Rrallë)
```javascript
// Nëse kërkon: "Fshi të gjithë librat e autorit X"
✅ bulkSoftDeleteByAuthor(authorId)

// Nëse kërkon: "Rikthe librin e fshirë"
✅ restoreBook(bookId)
```

---

## CHECKLIST për çdo detyrë:

### 📝 File-at që duhet të krijosh:

#### Backend:
- [ ] `models/Entity1.js` (p.sh. Author.js)
- [ ] `models/Entity2.js` (p.sh. Book.js)
- [ ] `repositories/Entity1Repository.js`
- [ ] `repositories/Entity2Repository.js`
- [ ] `services/Entity1Service.js`
- [ ] `services/Entity2Service.js`
- [ ] `controllers/Entity1Controller.js`
- [ ] `controllers/Entity2Controller.js`
- [ ] `routes/entity1Routes.js`
- [ ] `routes/entity2Routes.js`

#### Database:
- [ ] `current_database/entity1_entity2.sql`

#### Frontend:
- [ ] `pages/Entity1Entity2.jsx`

#### Updates:
- [ ] Update `models/index.js` - Shto modelet
- [ ] Update `repositories/index.js` - Shto repositories
- [ ] Update `Server.js` - Shto routes
- [ ] Update `App.jsx` - Shto route për faqen

---

## OPERACIONET PËR TË CILAT DUHET TË JESH I PËRGATITUR:

### 1. INSERT (Create)
```
Kërkesa: "Realizoni kodin për të insertuar Author"
→ Përdor: createAuthor(data)
→ Frontend: Form me input fields
```

### 2. SELECT (Read)
```
Kërkesa: "Shfaq të gjithë autorët"
→ Përdor: getAllAuthors()
→ Frontend: Tabela me të dhënat
```

### 3. SELECT me JOIN
```
Kërkesa: "Shfaq autorët me librat e tyre"
→ Përdor: getAllAuthors() me include
→ Frontend: Tabela që tregon edhe librat
```

### 4. SELECT me WHERE
```
Kërkesa: "Shfaq autorët nga USA"
→ Përdor: filterByCountry('USA')
→ Frontend: Dropdown ose input për filtrim
```

### 5. SELECT me LIKE
```
Kërkesa: "Kërko autorët që emri përmban 'John'"
→ Përdor: searchByName('John')
→ Frontend: Search input
```

### 6. UPDATE
```
Kërkesa: "Përditëso autorin"
→ Përdor: updateAuthor(id, data)
→ Frontend: Edit form
```

### 7. SOFT DELETE
```
Kërkesa: "Fshi autorin (soft delete)"
→ Përdor: softDeleteAuthor(id)
→ SQL: UPDATE author SET IsDeleted = TRUE WHERE AuthorID = ?
```

### 8. HARD DELETE
```
Kërkesa: "Fshi përfundimisht autorin"
→ Përdor: hardDeleteAuthor(id)
→ SQL: DELETE FROM author WHERE AuthorID = ?
```

### 9. CASCADE DELETE
```
Kërkesa: "Kur fshijmë autorin, fshihen edhe librat"
→ Përdor: ON DELETE CASCADE në foreign key
→ Vendoset në SQL schema
```

### 10. COUNT
```
Kërkesa: "Sa libra ka autori X?"
→ Përdor: countBooksByAuthor(authorId)
→ SQL: SELECT COUNT(*) FROM book WHERE AuthorID = ?
```

### 11. FILTER me BETWEEN
```
Kërkesa: "Librat me çmim midis 10 dhe 50"
→ Përdor: filterByPriceRange(10, 50)
→ SQL: WHERE Price BETWEEN 10 AND 50
```

### 12. FILTER me relacion
```
Kërkesa: "Shfaq librat e autorit me ID = 5"
→ Përdor: filterByAuthor(5)
→ SQL: WHERE AuthorID = 5
```

---

## GABIME TË ZAKONSHME:

### ❌ GABIM 1: Harron të shtosh IsDeleted në WHERE
```javascript
// GABIM:
async getAllAuthors() {
    return await this.getAll();  // Merr edhe të fshirët!
}

// SAKTË:
async getAllAuthors() {
    return await this.getAll({
        where: { IsDeleted: false }  // Vetëm jo të fshirët
    });
}
```

### ❌ GABIM 2: Nuk e përfshin relacionin (JOIN)
```javascript
// GABIM:
async getAllBooks() {
    return await this.getAll();  // Nuk ka informacion për Author
}

// SAKTË:
async getAllBooks() {
    return await this.getAll({
        include: [{
            model: Author,
            as: 'author'  // Përfshin autorin
        }]
    });
}
```

### ❌ GABIM 3: Soft delete vs Hard delete
```javascript
// Nëse detyr ka IsDeleted field → përdor SOFT DELETE
async delete(id) {
    return await this.updateById(id, { IsDeleted: true });
}

// Nëse nuk ka IsDeleted → përdor HARD DELETE
async delete(id) {
    return await this.deleteById(id);
}
```

### ❌ GABIM 4: Harron CASCADE në foreign key
```sql
-- GABIM:
FOREIGN KEY (AuthorID) REFERENCES author(AuthorID)

-- SAKTË (nëse kërkohet cascade):
FOREIGN KEY (AuthorID) REFERENCES author(AuthorID) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
```

---

## FRONTEND PATTERNS:

### Pattern 1: Form për INSERT
```jsx
<form onSubmit={createAuthor}>
    <input name="Name" />
    <input name="Email" />
    <button type="submit">Add</button>
</form>
```

### Pattern 2: Tabela për READ
```jsx
<table>
    {authors.map(a => (
        <tr key={a.AuthorID}>
            <td>{a.Name}</td>
            <td>{a.Email}</td>
        </tr>
    ))}
</table>
```

### Pattern 3: Search/Filter
```jsx
<input 
    placeholder="Search..."
    onChange={(e) => search(e.target.value)}
/>
```

### Pattern 4: Dropdown për relacion
```jsx
<select name="AuthorID">
    {authors.map(a => (
        <option key={a.AuthorID} value={a.AuthorID}>
            {a.Name}
        </option>
    ))}
</select>
```

---

## SHPREHJE TË ZAKONSHME NË DETYRA:

| Shprehja në detyrë | Çfarë do të thotë | Operacioni |
|--------------------|-------------------|------------|
| "Realizoni kodin për të insertuar" | Create | `create()` |
| "Shfaq të gjithë" | Read all | `getAll()` |
| "Shfaq sipas ID" | Read by ID | `getById(id)` |
| "Përditëso" / "Edit" | Update | `update(id, data)` |
| "Fshi" | Delete | `delete(id)` |
| "Kërko" | Search | `search(term)` |
| "Filtro" | Filter | `filter()` |
| "Me të dhënat e..." | With JOIN | `include: [...]` |
| "IsDeleted" në detyrë | Soft Delete | `{ IsDeleted: true }` |
| "Fshi përfundimisht" | Hard Delete | `DELETE FROM` |
| "Kur fshijmë X, fshihen edhe Y" | Cascade | `ON DELETE CASCADE` |

---

Kjo është e gjithë informacioni që të nevojitet për çdo detyrë! 🎯
