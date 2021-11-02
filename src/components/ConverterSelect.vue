<template>
	<div class="converter-select">
		<div class="converter-select__head"
			 ref="converterSelectHead"
			 @click="onSelectHead">{{baseValute}} <span class="converter-arrow">&#9660;</span></div>
		<ul class="converter-select__body" ref="converterSelectBody">
			<li class="converter-select__item"
				v-for="valuteName in valuteCodes"
				:key="valuteName"
				@click="onSelectItem(valuteName)">
					{{valuteName}}
			</li>
		</ul>
	</div>
</template>

<script>

	import { mapActions, mapGetters } from 'vuex';

	export default {
		inject: ['valuteCodes'],
		data() {
			return {
				baseValute: 'RUB',
			}
		},
		computed: {
			...mapGetters(['baseConverterValuteName']),
		},
  		methods: {
  			...mapActions(['changeBaseConverterValuteName']),
  			onSelectHead() {
  				this.$refs.converterSelectBody.classList.toggle('visible');
  			},
  			onSelectItem(name) {
  				this.changeBaseConverterValuteName(name);
  				this.baseValute = this.baseConverterValuteName;
  				this.$refs.converterSelectBody.classList.remove('visible');
  			}
  		},
  		created() {
  			this.baseValute = this.baseConverterValuteName;
  		}
	};
	
</script>

<style scoped>
	.converter-select {
		display: inline-block;
		position: relative;
		cursor: pointer;
	}

	.converter-select__head,
	.converter-select__item {
		display: inline-flex;
		align-items: center;
		background: #fff;
		padding: 10px 15px;
	}

	.converter-select__head {
		border-radius: 10px;
		justify-content: space-between;
	}

	.converter-arrow {
		display: inline-block;
		font-size: 15px;
		color: grey;
		margin-left: 15px;
	}

	.converter-select__body {
		margin: 0;
		padding: 0;
		position: absolute;
		dusplay: flex;
		flex-direction: column;
		top: 44px;
		left: 0;
		border-radius: 10px;
		z-index: 30;
		transition: 0.6s;
		opacity: 0;
		visibility: hidden;
		pointer-events: none;
	}

	.converter-select__body.visible {
		opacity: 1;
		visibility: visible;
		pointer-events: all;
		overflow-y: auto;
		max-height: 500px;
	}

	.converter-select__item {
		display: block;
		margin: 0;
		list-style: none;
		border-radius: 0;
		text-align: center;
		transition: 0.6s;
	}

	.converter-select__item:hover {
		background: #ebe8e8;
		color: #120f0f;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	    -webkit-appearance: none;
	    margin: 0;
	}

	input[type=number] {
	  -moz-appearance: textfield;
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

</style>