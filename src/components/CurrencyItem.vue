<template>
	<div class="currency-item">
		<span class="currency-item__name">{{item.Name}}</span>
		<div class="currency-item__body">
			<p class="currency-item__info">
				<span>{{item.Nominal}}</span>
				<span class="valute-span">{{item.CharCode}}</span> &harr;
				<span>{{indexedValuteValue}}</span>
				<span class="valute-span">{{charCode}}</span>
			</p>
			<span class="currency-item__difference" :class="{ growthPlus: growth, growthMinus: !growth }">
				{{differenceValue}}
			</span>
		</div>
	</div>
</template>

<script>
	
	export default {
		props: {
			item: {
				type: Object,
				required: true
			},
			charCode: {
				type: String,
				default: 'RUB'
			},
			course: {
				type: Number,
				default: 1
			},
			nominalIndex: {
				type: Number,
				default: 1
			}
		},
		computed: {
			growth() {
				return this.differenceValue > 0;
			},
			valuteValue() {
				return (this.item.Value / this.course).toFixed(4);
			},
			indexedValuteValue() {
				return Math.ceil((this.valuteValue * this.nominalIndex) * 100) / 100;
			},
			valutePrevious() {
				return this.item.Previous / this.course;
			},
			differenceValue() {
				return Math.ceil((this.valuteValue - this.valutePrevious) * 10000) / 10000;
			},
		}
	};

</script>

<style scoped>
	
   .currency-item {
   		width: 100%;
   		max-width: 320px;
   		background: #fff;
   		border-radius: 10px;
   		padding: 20px 15px;
   		box-sizing: border-box;
   		margin: 15px;
   		display: flex;
   		flex-direction: column;
   		justify-content: space-evenly;
   } 

   .currency-item__name {
   		display: inline-block;
   		color: gray;
   		font-size: 14px;
   		margin-bottom: 8px;
   }

   .currency-item__body {
   		display: flex;
   		justify-content: space-between;
   }

   .currency-item__info {
   		display: inline-block;
   		color: #1c1b1b;
   		font-size: 18px;
   }

   .currency-item__difference {
   		display: inline-block;
   		font-size: 18px;
   }

   .valute-span {
   		margin-left: 3px;
   }

   .growthPlus {
   		position: relative;
   		display: inline-block;
   		color: green;
   }

   .growthPlus:before {
   		content: '↑';
   		position: absolute;
   		top: -6px;
   		left: -15px;
   		font-size: 24px;
   }

   .growthMinus {
   		position: relative;
   		display: inline-block;
   		color: red;
   }

   .growthMinus:before {
   		content: '↓';
   		position: absolute;
   		top: -6px;
   		left: -15px;
   		font-size: 24px;
   }

</style>