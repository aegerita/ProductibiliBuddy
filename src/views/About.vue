<template>
  <div style="padding: 0 20px">
    <h1>Thanks for your support!</h1>
    <!-- <h2>Under contruction, thanks for your support!</h2> -->
    <div class="description">
      <div class="block1">
        <h2>Update:</h2>
        <h3>Date: Jan 08 2021</h3>
        Made my own tooltip with CSS
        <br />
        Check out the stats page for you stats :)
      </div>
      <div class="block2">
        <h3 style="margin: 15px">Todo list (meta):</h3>
        <ul>
          <li>Make the stats page better looking</li>
          <li>Dark mode</li>
          <li>Drag to order todos (if even possible)</li>
          <li>Backend with mongodb or smth</li>
          <li>Hopefully turn the whole thing to typescript</li>
        </ul>
      </div>
    </div>
    <div class="description">
      <div class="block1"><h2>Functions:</h2></div>
      <div class="block2">
        <ul>
          <li>Kindly greets you with random phrases</li>
          <li>Store todos in cookies</li>
          <li>Horizontal / Vertical layouts</li>
          <li>Undo / Redo</li>
          <li>Drag and drop (with html)</li>
          <li>Keyboard shortcuts & Tooltips</li>
          <li>Easter eggs</li>
        </ul>
      </div>
    </div>
    <div class="description">
      <div class="block1"><h2>Keyboard Shortcuts:</h2></div>
      <div class="block2">
        <ul>
          <li>Undo: ctrl+z</li>
          <li>Redo: ctrl+shift+z</li>
          <li>Add todo: enter</li>
          <li>Delete todo: right click</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1, h2, h3 {
  font-family: 'Avenir Heavy', Arial, sans-serif;
}
.description {
  display: flex;
  padding: 0 40pt;
}
.block2 {
  flex: 1.7;
  text-align: start;
  font-size: 12.5pt;
}
.block1 {
  flex: 1;
}
@media only screen and (max-width: 500px) {
  .description {
    display: block;
    padding: 0pt;
  }
}
</style>
