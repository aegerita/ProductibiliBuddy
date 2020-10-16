<template>
	<!-- class complete when then the todo.completed is true -->
	<div :class="{'is-complete':todo.completed}" @click="$emit('toggle', todo)" @click.right.prevent="$emit('del-todo', todo)" draggable="true">
		<h3>
			<!-- checkbox method -->
			<input type="checkbox" :checked="todo.completed">
			{{todo.title}}
			<!-- send event -->
			<popper :delay-on-mouse-over='1000' :visible-arrow='false' :options="{placement: 'bottom'}">
				<div class="popper">(right click todo to delete)</div>
				<button slot="reference" @click.stop="$emit('del-todo', todo)">X</button>
			</popper>
		</h3>
	</div>
</template>

<script>
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

export default {
	name: "Todoitem",
	props: ["todo"],
	components: {
		'popper': Popper
    },
}
</script>

<style scoped>
	div {
		background: #f4f4f4;
		padding: 10px;
		border: 2px #cccccc dotted;
		text-align: start;
	}
	.is-complete {
		text-decoration: line-through;
		background: #e0e0e0;
	}
	button {
		background: transparent;
		color: #6f6f6f;
		font-size: 19px;
		font-weight: 500;
		cursor: pointer;
		float: right;
		border: dotted 1px;
		padding: 4px 8px;
		border-radius: 50%;
	}
	.popper {
		background:rgba(1,1,1,0.5);
		color: #f6f6f6;
		border: transparent;
		padding: 0;
	}
</style>