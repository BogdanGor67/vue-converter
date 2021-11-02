<template>
		<div class="container converter">
			<div class="converter-container">
				<div class="converter-block">
					<div class="converter-item">
						<h4 class="converter-item__name">{{mainUnit.Name}}</h4>
						<div class="converter-item__body">
							<converter-select />
							<input type="number" v-model="valuteCount" min="0" class="converter-item__input">
						</div>
					</div>
					<div class="ball">&harr;</div>
					<div class="converter-item">
						<h4 class="converter-item__name">{{restValuteName}}</h4>
						<div class="converter-item__body">
							<result-select @changeResultValute="changeResultValute" />
							<span class="converter-item__span">{{resultValue}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
</template>


<script>

	import { mapGetters } from 'vuex';
	import ConverterSelect from '@/components/ConverterSelect';
	import ResultSelect from '@/components/ResultSelect';
	
  export default {
  		name: 'Converter',
  		components: {
  			ConverterSelect,
  			ResultSelect
  		},
  		data() {
  			return {
  				valuteCount: 1,
  				resultCharCode: 'RUB',
  				restValuteName: 'Рубль',
  				valuteIndex: 1,
  			}
  		},
  		provide() {
  			return {
  				valuteCodes: Object.keys(this.valute),
  			}
  		},
  		computed: {
  			...mapGetters(['valute', 'baseConverterValuteName', 'resultValuteName']),
  			mainUnit() {
  				return Object.values(this.valute).find(unit => unit.CharCode === this.baseConverterValuteName);
  			},
  			baseCourse() {
  				return this.mainUnit.Value / this.mainUnit.Nominal;
  			},
  			resultUnit() {
  				return Object.values(this.valute).find(unit => unit.CharCode === this.resultValuteName);
  			},
  			resultValue() {
  				return ((Math.ceil((this.baseCourse / this.valuteIndex) * 10000) / 10000) * this.valuteCount).toFixed(4);
  			}
  		},
  		methods: {
  			changeResultValute() {
  				this.resultCharCode = this.resultUnit.CharCode;
  				this.restValuteName = this.resultUnit.Name;
  				this.valuteIndex = this.resultUnit.Value / this.resultUnit.Nominal;
  			}
  		},
  };

</script>

<style scoped>

	.converter-container {
		padding: 100px 0;
	}

	.converter-block {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.converter-item {
		padding: 20px 15px;
		background: #fff;
		border-radius: 10px;
		min-width: 320px;
		margin: 0 10px;
	}

	.converter-item__name {
		display: inline-block;
   		color: gray;
   		font-size: 14px;
   		margin-bottom: 8px;
	}

	.converter-item__body {
   		display: flex;
   		justify-content: flex-start;
   		align-items: center;
   		font-size: 20px;
   }

   .converter-item__span {
   		margin-left: 30px;
   		font-size: 20px;
   		color: #020202;
   }

   .ball {
   		padding: 10px;
   		border-radius: 50%;
   		color: lightblue;
   		font-size: 32px;
   		background: #fff;
   		font-weight: 700;
   }

   .converter-item__input {
   		border: none;
   		margin-left: 30px;
   		font-size: 20px;
   		color: #020202;
   		padding: 10px;
   		max-width: 150px;
   }

   .converter-item__input:focus {
   		outline: none;
   		border-bottom: 2px solid lightseagreen;
   }

	.converter-result-select {
		display: inline-block;
		position: relative;
		cursor: pointer;
	}

	.converter-result-select__head,
	.converter-result-select__item {
		display: inline-flex;
		align-items: center;
		background: #fff;
		padding: 10px 15px;
	}

	.converter-result-select__head {
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

	.converter-result-select__body {
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

	.converter-result-select__body.visible {
		opacity: 1;
		visibility: visible;
		pointer-events: all;
		overflow-y: auto;
		max-height: 500px;
	}

	.converter-result-select__item {
		display: block;
		margin: 0;
		list-style: none;
		border-radius: 0;
		text-align: center;
		transition: 0.6s;
	}

	.converter-result-select__item:hover {
		background: #ebe8e8;
		color: #120f0f;
	}

	@media (max-width: 760px) {
		.converter-block {
			flex-direction: column;
		}

		.converter-item {
			margin: 20px 0;
		}
	}

	@media (max-width: 360px) {
		.converter-item {
			padding: 20px 10px;
			max-width: 300px;
			min-width: 300px;
		}
	}

</style>