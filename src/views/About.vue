<template>
	<div class="about" style="padding:20px 20px 0 20px">
		<h1>This is an about page</h1>
		<div style="padding: 10px 0 25px 0;">
			<h2>Thanks for your support!</h2>
			<h2>Still under contruction</h2>
		</div>
		<div class="description">
			<h2>Functions:</h2>
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
		<div class="description">
			<h2>Keyboard Shortcuts:</h2>
			<ul>
				<li>Undo: ctrl+z</li>
				<li>Redo: ctrl+shift+z</li>
				<li>Delete todo: right click</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
	.description {
		display: flex;
		padding: 0 40pt;
	}
	ul {
		flex: 1.7;
		text-align: start;
		font-size: 12.5pt;
	}
	h2 {
		flex: 1;
	}
	@media only screen and (max-width: 500px) {
		.description {
			display: block;
			padding: 0pt;
		}
	}
</style>