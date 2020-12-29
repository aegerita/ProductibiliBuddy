<template>
  <div class="about" style="padding: 0 20px">
    <h1>Thanks for your support!</h1>
    <!-- <h2>Under contruction, thanks for your support!</h2> -->
    <div class="description">
      <div class="block1">
        <h2>Update: </h2>
        <h3>Date: Dec 29 2020 </h3>
        Now I use vuex to store your todos! Rejoice! <br> Also, migrated from vue2 to vue3, with Composition API! <br>
        What a glorious world in front of me ...
      </div>
      <div class="block2">
        <h3 style="margin: 15px">Todo list (meta): </h3>
        <ul>
        <li>When todos have same title, drag and drop is confused. Stop that</li>
        <li>The tooltip plugin is not supported by vue3 anymore, must do it myself</li>
        <li>Optimize storage with vuex</li>
        <li>Make an achievement page for fun</li>
        <li>Backend with firebase or smth <strong>(stretch goal)</strong></li>
        <li>Update messages according to achievement and activity <strong>(stretch goal)</strong></li>
      </ul> </div>
    </div>
    <div class="description">
      <div class="block1"><h2>Functions:</h2></div>
      <div class="block2"><ul>
        <li>Kindly greets you with random phrases</li>
        <li>Store todos in cookies</li>
        <li>Horizontal / Vertical layouts</li>
        <li>Undo / Redo</li>
        <li>Drag and drop (with html)</li>
        <li>Keyboard shortcuts & <s>Tooltips</s> <strong>(temporarily disabled)</strong></li>
        <li>Easter eggs</li>
      </ul></div>
    </div>
    <div class="description">
      <div class="block1"><h2>Keyboard Shortcuts:</h2></div>
      <div class="block2"><ul>
        <li>Undo: ctrl+z</li>
        <li>Redo: ctrl+shift+z</li>
        <li>Add todo: enter</li>
        <li>Delete todo: right click</li>
      </ul></div>
    </div>
  </div>
</template>

<style scoped>
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