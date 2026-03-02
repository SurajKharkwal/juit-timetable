<h1 align="center">
  <a
    href="https://juit-timetable.vercel.app"
    style="color:#1976d2; text-decoration:underline;"
  >
    JUIT Timetable
  </a>
</h1>

<p align="center">
  For contribution guidelines, see
  <a href="./CONTRIBUTION.md" style="text-decoration:none;">
    CONTRIBUTION.md
  </a>.
</p>

<h3 align="center">How the Project Is Built</h3>

<p align="center">
  The official college timetable is provided in
  <code>.xls</code> format.
  It is parsed using Python with
  <code>pandas</code> and
  <code>xlrd</code>, then converted into structured JSON.
</p>

<p align="center">
  The parsing and transformation logic is implemented in the
  <a href="https://github.com/SurajKharkwal/juit-timetable/blob/data/UPDATE" style="text-decoration:none;">
    UPDATE
  </a>
  Python script in the <b>data</b> branch.
</p>

<p align="center">
  The processed data is committed automatically to a dedicated
  <b>data branch</b> using a GitHub bot
  <a href="./workflows/update-timetable.yaml" style="text-decoration:none;">
    BOT
  </a>.
  The Vite frontend fetches the required files from this branch
  based on user input and renders the timetable dynamically.
</p>

<p align="center">
  The architecture is intentionally minimal.
  Data generation is automated.
  The client is responsible only for rendering.
</p>

<h3 align="center">Why Not Fetch Directly From the .xls File?</h3>

<p align="center">
  You already know the answer.
</p>

<p align="center">
  Because that would mean trusting the college servers and website —
  and we all know how <em>consistently reliable</em> those are.
</p>
