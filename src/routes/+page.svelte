<script>
  let { data } = $props();
</script>

<h1>Spiele</h1>
<ul>
  {#each data.games as game}
    <li>{game.title} ({game.minPlayers}–{game.maxPlayers} Spieler, {game.duration} Min.)</li>
  {/each}
</ul>

<form method="POST" action="?/add">
  <input name="title" placeholder="Titel" required />
  <input name="minPlayers" type="number" placeholder="Min. Spieler" required />
  <input name="maxPlayers" type="number" placeholder="Max. Spieler" required />
  <input name="duration" type="number" placeholder="Dauer (Min.)" required />
  <input name="genre" placeholder="Genre" />
  <button>Hinzufügen</button>
</form>