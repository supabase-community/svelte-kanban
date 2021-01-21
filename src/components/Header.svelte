<script>
  import db from '@/db'
  import gravatarUrl from 'gravatar-url'

  const user = db.user
</script>

<header>
  <span/>
  <slot/>
  <!-- <button on:click={() => db.signOut()}>Sign out</button> -->

  <img src={gravatarUrl($user.email, {size: 40})} alt="Gravatar"/>
</header>

<style>
  header {
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    color: rgba(255, 255, 255, 0.5);
    font-weight: bold;
    font-size: 1.2rem;
    padding: 0.5rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  img {
    border-radius: 50%;
    margin-right: 4px;
  }
</style>
