<template>
	<div class="custom-select">
		<div class="custom-select__head" @click="selectOn">
			 {{selectValue}} <span ref="arrow" class="select-arrow">&#9660;</span>
		</div>
		<ul class="custom-select__body" ref="selectBody">
			<li class="custom-select__item" 
					v-for="el in elements" 
					:key="el.ID"
					@click="onSelectItem({name: el.Name, code: el.CharCode, value: el.Value, nominal: el.Nominal })">
					{{el.Name}}
			</li>
		</ul>
	</div>
</template>

<script>

	import { mapActions, mapGetters } from 'vuex';
	
	export default {
        props: {
        	elements: {
        		type: Array,
        		required: true,
        	}
        },
        computed: {
        	...mapGetters(['baseValute']),
        	selectValue() {
        		return this.baseValute.longName;
        	}
        },
        methods: {
        	...mapActions(['changeBaseValute']),
        	selectOn() {
        		this.$refs.selectBody.classList.toggle('visible');
        		this.$refs.arrow.classList.toggle('turned');
        	},
        	onSelectItem(obj) {
        		this.changeBaseValute({ name: obj.code, index: obj.value, nominal: obj.nominal, longName: obj.name });
        		this.$refs.selectBody.classList.remove('visible');
        		this.$refs.arrow.classList.remove('turned');
        	}
        }
	};

</script>

<style scoped>
	
	.custom-select {
		position: relative;
		cursor: pointer;
	}

	.custom-select__head,
	.custom-select__item {
		min-width: 360px;
		max-width: 360px;
		display: flex;
		align-items: center;
		background: #fff;
		padding: 10px 15px;
	}

	.custom-select__head {
		border-radius: 10px;
		justify-content: space-between;
	}

	.select-arrow {
		transition: 0.6s;
		transform: rotate(-90deg);
	}

	.select-arrow.turned {
		transform: rotate(0);
	}

	.custom-select__body {
		margin: 0;
		padding: 0;
		position: absolute;
		top: 44px;
		left: 0;
		border-radius: 10px;
		z-index: 30;
		transition: 0.6s;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}

	::-webkit-scrollbar {
		width: 5px;
	}

	::-webkit-scrollbar-track {
		background: lightgrey;
		box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) inset;
	}

	::-webkit-scrollbar-thumb {
		background: #020202;
		border-radius: 4px;
	}

	.custom-select__body.visible {
		opacity: 1;
		visibility: visible;
		pointer-events: all;
		overflow-y: auto;
		max-height: 500px;
	}

	.custom-select__item {
		width: 100%;
		margin: 0;
		list-style: none;
		border-radius: 0;
		text-align: center;
		transition: 0.6s;
	}

	.custom-select__item:hover {
		background: #ebe8e8;
		color: #120f0f;
	}

	@media (max-width: 420px) {
  		.custom-select__head,
		.custom-select__item {
			font-size: 14px;
			padding: 10px 5px;
			max-width: 290px;
			min-width: 290px;
		}
  	}
	
</style>