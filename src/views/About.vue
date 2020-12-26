<template>
	<div class="about" style="padding:20px">
		<h1>This is an about page</h1>
		<div style="padding:10px;">
			<h2>Thank you for your support!</h2>
		</div>
		<div id="function">
			<h2>Functions:</h2>
			<ul>
				<li>Kindly greets you with random phrases</li>
				<li>Store todos in cookies</li>
				<li>Two pleasing layouts</li>
				<li>Undo / Redo</li>
				<li>Drag and drop (with html)</li>
				<li>Keyboard shortcuts & Tooltips</li>
				<li>Easter eggs</li>
			</ul>
		</div>
		<div style="padding:30px;">
			<h2>Still under contruction</h2>
			<h2>Don't peek!</h2>
		</div>
	</div>
</template>

<style scoped>
	#function {
		display: flex;
		padding: 0 40pt;
	}
	#function ul {
		flex: 1.7;
		text-align: start;
	}
	#function h2 {
		flex: 1;
	}
	@media only screen and (max-width: 500px) {
		#function {
			display: block;
			padding: 0pt;
		}
	}
</style>