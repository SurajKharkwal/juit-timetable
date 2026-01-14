<h1 align="center">
  <a
    href="https://juit-timetable.vercel.app"
    style="color:#1976d2; text-decoration:none;"
  >
    JUIT Timetable
  </a>
</h1>

<p align="center">
  Vite &middot; TanStack Router &middot; GitHub Actions
</p>

### Contributions
<p>
  For contribution guidelines, see
  <a href="./CONTRIBUTION.md">CONTRIBUTION.md</a>.
</p>

### How the Project Is Built
<p>
  The official college timetable is provided in
  <code>.xls</code> format.
  It is parsed using Python with
  <code>pandas</code> and
  <code>xlrd</code>, then converted into structured JSON.
</p>
<p>
  The processed data is committed automatically to a dedicated
  <b>data branch</b> using a GitHub bot
    <a href="./workflows/update-timetable.yaml">BOT</a>.
  The Vite frontend fetches the required files from this branch
  based on user input and renders the timetable dynamically.
</p>
<p>
  The architecture is intentionally minimal.
  Data generation is automated.
  The client is responsible only for rendering.
</p>

### Why Not Fetch Directly From the .xls File?
<p>
  You already know the answer.
</p>
<p>
  Because that would mean trusting the college servers and website —
  and we all know how <em>consistently reliable</em> those are.
</p>
