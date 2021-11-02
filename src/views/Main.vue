<template>
	<div class="container">
	<div class="main" v-if="requestStatus">
		<div class="main-header">
			<input type="text" v-model="searchValue" class="search-input" placeholder="Поиск...">
			<v-select :elements="Object.values(this.currency)" />
		</div>
		<transition-group tag="div" name="fade" class="currency-container">
			<currency-item v-for="item in searchingValute" :key="item.ID" :item="item" :charCode="base" :course="currencyIndex" :nominalIndex="nominalValue" />
		</transition-group>
	</div>
	<E404 v-else />
	</div>
</template>

<script>



	import axios from 'axios';
	import { mapGetters, mapActions } from 'vuex';
	import CurrencyItem from '@/components/CurrencyItem';
	import E404 from '@/components/E404';
	import VSelect from '@/components/VSelect';
	
	export default {
		components: {
			E404,
			CurrencyItem,
			VSelect
		},
		data() {
			return {
				main: true,
				searchValue: '',
			}
		},
		computed: {
			...mapGetters(['date', 'previousDate', 'valute', 'status', 'baseValute']),
			requestStatus() {
				if (this.status >= 200 && this.status < 300) {
					return true;
				} else {
					return false;
				}
			},
			dateNow() {
				return this.date.split('T')[0];
			},
			prevDate() {
				return this.previousDate.split('T')[0];
			},
			currency() {
				return this.valute;
			},
			base() {
				return this.baseValute.name;
			},
			currencyIndex() {
				return this.baseValute.index;
			},
			nominalValue() {
				return this.baseValute.nominal;
			},
			searchingValute() {
				return Object.values(this.currency).filter(item => item.Name.split(' ').join('').toLowerCase().includes(this.searchValue.toLowerCase()) || item.NumCode.includes(this.searchValue));
			}
		},
		methods: {
			show() {
				this.main = !this.main;
			},
			onSelect(e) {
				console.log(e.target);
				this.baseValute = e.target.value;
			}
		},
	};

</script>

<style scoped>

	.main {
		padding: 30px 0;
	}

	.main-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 50px;
	}
	
	.currency-container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}

	.search-input {
		width: 100%;
		max-width: 320px;
		display: flex;
		align-items: center;
		height: 40px;
		border-radius: 5px;
		border: none;
		padding: 5px 10px;
	}

	.search-input:focus {
		outline: 2px solid grey;
	}

  .fade-enter-from {
      opacity: 0;
      transform: scale(0);
  }

  .fade-enter-to {
      opacity: 1;
      transform: scale(1);
  }

  .fade-enter-active {
    transition: all 0.6s ease;
  }

  .fade-leave-from {
      opacity: 1;
      transform: scale(1);
  }

  .fade-leave-to {
      opacity: 0;
      transform: scale(0);
  }

  .fade-leave-active {
    transition: all 0.6s ease;
    position: absolute;
  }

  .fade-move {
    transition: all 0.6s ease;
  }

  @media (max-width: 920px) {
  		.main-header {
  				justify-content: center;
  				align-items: center;
  				flex-direction: column;
  		}

  		.search-input {
  			margin-bottom: 30px;
  		}
  }

  @media (max-width: 695px) {
  		.currency-item {
  				margin: 20px 0;
  		}
  }

</style>