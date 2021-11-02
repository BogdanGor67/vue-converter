<template>
	<div class="result-select">
		<div class="result-select__head"
			 ref="resultSelectHead"
			 @click="onResultHead"> {{resultValute}} <span class="converter-arrow">&#9660;</span> </div>
		<ul class="result-select__body" ref="resultSelectBody">
			<li class="result-select__item"
				v-for="resultName in valuteCodes"
				:key="resultName"
				@click="onResultItem(resultName)">
					{{resultName}}
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
				resultValute: 'RUB',
			}
		},
		computed: {
			...mapGetters(['resultValuteName']),
		},
  		methods: {
  			...mapActions(['changeResultValuteName']),
  			onResultHead() {
  				this.$refs.resultSelectBody.classList.toggle('visible');
  			},
  			onResultItem(name) {
  				this.changeResultValuteName(name);
  				this.resultValute = this.resultValuteName;
  				this.$emit('changeResultValute');
  				this.$refs.resultSelectBody.classList.remove('visible');
  			}
  		},
	};
	
</script>

<style scoped>
	.result-select {
		display: inline-block;
		position: relative;
		cursor: pointer;
	}

	.result-select__head,
	.result-select__item {
		display: inline-flex;
		align-items: center;
		background: #fff;
		padding: 10px 15px;
	}

	.result-select__head {
		border-radius: 10px;
		justify-content: space-between;
	}

	.converter-arrow {
		display: inline-block;
		font-size: 15px;
		color: grey;
		margin-left: 15px;
	}

	.result-select__body {
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

	.result-select__body.visible {
		opacity: 1;
		visibility: visible;
		pointer-events: all;
		overflow-y: auto;
		max-height: 500px;
	}

	.result-select__item {
		display: block;
		margin: 0;
		list-style: none;
		border-radius: 0;
		text-align: center;
		transition: 0.6s;
	}

	.result-select__item:hover {
		background: #ebe8e8;
		color: #120f0f;
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