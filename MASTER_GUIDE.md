# 📚 MASTER GUIDE - Të gjitha opsionet e mundshme për detyra

## Pattern që përdoret gjithmonë:

Çdo detyrë zakonisht ka këtë strukturë:
1. **Dy entitete** me relacion One-to-Many (një Author ka shumë Books)
2. **CRUD operacione** për të dy
3. **Opsione speciale** sipas kërkesës

---

## Opsionet që mund të kërkojë profesori:

### A. CRUD Bazik (GJITHMONË)
- ✅ Create (Insert/Shto)
- ✅ Read (View/Shfaq)
- ✅ Update (Edit/Përditëso)
- ✅ Delete (Fshi)

### B. Soft Delete vs Hard Delete
1. **Soft Delete** - Nuk e fshin realisht, vetëm e markon si `IsDeleted = true`
   - Shfaqen vetëm ato me `IsDeleted = false`
   - Mund të ketë endpoint special për të parë ato të fshira
   
2. **Hard Delete** - E fshin përfundimisht nga databaza

### C. Filtrimi & Kërkimi
- 🔍 Kërko sipas **emrit** (search by name)
- 🔍 Kërko sipas **ID** (find by ID)
- 🔍 Filtro sipas **statusit** (IsDeleted, IsActive, etj.)
- 🔍 Filtro sipas **relacionit** (p.sh. shfaq vetëm librat e një autori)

### D. Operacione Speciale
- 📊 Shfaq me relacione (me JOIN)
- 🔢 Numëro rekorde (count)
- 📄 Pagination (ndarje në faqe)
- 🔄 Bulk operations (fshi/përditëso shumë rekorde njëherësh)
- ✅ Validime (p.sh. email duhet të jetë valid)
- 🔗 Cascade delete (kur fshijmë Author, fshihen edhe Books)

### E. Frontend Operacione
- Forumulare për të shtuar
- Tabela për të shfaqur
- Modal/Form për të edituar
- Butona për delete me confirmation
- Search bar për kërkime
- Dropdown për relacione (p.sh. zgjedh Author kur krijon Book)

---

## Struktura e file-ave (GJITHMONË e njëjtë):

```
Backend:
├── models/
│   ├── Author.js          (Tabela e parë)
│   └── Book.js            (Tabela e dytë që varet nga e para)
├── repositories/
│   ├── AuthorRepository.js
│   └── BookRepository.js
├── services/
│   ├── AuthorService.js
│   └── BookService.js
├── controllers/
│   ├── AuthorController.js
│   └── BookController.js
└── routes/
    ├── authorRoutes.js
    └── bookRoutes.js

Frontend:
└── pages/
    └── AuthorBook.jsx     (Faqja që ka të gjitha operacionet)

Database:
└── author_book.sql        (SQL schema me sample data)
```

---

## Si ta lexosh detyrën:

1. **Identifiko dy entitetet** - Zakonisht janë të theksuara në foto
2. **Shih relacionin** - Njëri ka foreign key që tregon te tjetri
3. **Lexo kërkesat** - Ato janë me shkronja a), b), c), d), e)
4. **Identifiko tipin e operacionit**:
   - "Realizoni kodin e nevojshëm për të insertuar" = CREATE
   - "Shfaq/View" = READ
   - "Përditëso/Update/Edit" = UPDATE
   - "Fshi/Delete" = DELETE
   - "Filtro/Kërko" = SEARCH/FILTER

---

## Pyetjet më të zakonshme:

### 1. "Si ta di nëse duhet soft delete apo hard delete?"
- Nëse ka fushë `IsDeleted` në detyrë → **Soft Delete**
- Nëse thotë "fshi përfundimisht" → **Hard Delete**
- Nëse nuk specifikon → zakonisht **Hard Delete**

### 2. "Si ta di nëse duhet të shfaq relacionet?"
- Nëse thotë "shfaq librat e autorit" → duhet JOIN
- Nëse thotë "me të dhënat e..." → duhet JOIN
- Nëse vetëm thotë "shfaq" → mund pa JOIN

### 3. "Si ta di cilin është parent dhe cilin është child?"
- Ai që ka Foreign Key është **child** (Book ka AuthorID)
- Ai që referensohet është **parent** (Author referensohet nga Book)

### 4. "Çfarë do të thotë CASCADE?"
- Kur fshijmë **parent**, fshihen automatikisht edhe **children**
- P.sh. kur fshijmë Author, fshihen edhe të gjitha Books e tij

---

## Template i shpejtë për detyrë të re:

```javascript
// 1. Identifiko entitetet
Entity1: _________ (parent)
Entity2: _________ (child - ka foreign key)

// 2. Identifiko fushat
Entity1 fields: ID, _____, _____, _____
Entity2 fields: ID, _____, _____, Entity1_ID (FK)

// 3. Identifiko operacionet
Create: □ Entity1  □ Entity2
Read:   □ All      □ By ID    □ With Relations
Update: □ Entity1  □ Entity2
Delete: □ Soft     □ Hard     □ Cascade

// 4. Identifiko operacionet speciale
□ Filter by name
□ Search
□ Show deleted
□ Count records
```

---

## Shembull i plotë në vazhdim:

Do të krijoj një implementim komplet **Author & Book** që ka të gjitha opsionet e mundshme dhe është i mbushur me komente që shpjegojnë çdo pjesë. Kjo do të jetë "MASTER TEMPLATE" që mund ta kopjosh dhe ta modifikosh për çdo detyrë.
