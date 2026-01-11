<template>
  <ad-card class="nuc-entity-datatable-card">
    <template #title>
      <div class="nuc-entity-datatable-card-header-container">
        <template v-if="props.loading">
          <ad-skeleton
            :loading="props.loading"
            width="180px"
            height="32px"
            border-radius="10px"
            class="heading-skeleton"
          />
          <div class="heading-actions-skeleton">
            <ad-skeleton
              v-if="shareEnabled"
              :loading="props.loading"
              width="42px"
              height="42px"
              shape="circle"
            />
            <ad-skeleton
              :loading="props.loading"
              width="42px"
              height="42px"
              shape="circle"
            />
          </div>
        </template>
        <template v-else>
          <ad-heading :tag="props.tag" :text="props.headerText" />

          <div class="nuc-entity-datatable-card-header-actions">
            <ad-button
              v-if="props.adType !== 'activity'"
              :ad-type="props.adType"
              icon="prime:share-alt"
              rounded
              text
              @click="shareDialogVisible = true"
            />
            <ad-button
              v-if="props.adType !== 'activity'"
              :ad-type="props.adType"
              icon="prime:plus"
              rounded
              text
              @click="props.openDialog?.('create')"
            />
          </div>
        </template>
      </div>
    </template>
    <template #content>
      <nuc-entity-datatable
        v-if="props.value"
        :value="props.value"
        :rows="10"
        :rows-per-page-options="[10, 20, 50]"
        :open-dialog="props.openDialog"
        :ad-type="props.adType"
        :loading="props.loading"
        :global-filter-fields="globalFilterFields"
        :enable-share="shareEnabled"
        v-model:filters="filters"
        filter-display="row"
        paginator-template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
        current-page-report-template="{first} to {last} of {totalRecords}"
        @update:selected="selectedItems = $event"
      />
    </template>
  </ad-card>

  <nuc-share-dialog
    v-model:visible="shareDialogVisible"
    :ad-type="props.adType"
    :selected-entities="selectedItems"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import type { NucEntityDatatableCardInterface } from 'atomic'
import { columns } from 'atomic'

const props = defineProps<NucEntityDatatableCardInterface>()

const shareDialogVisible = ref(false)
const selectedItems = ref<unknown[]>([])

const specificColumns = columns[props.adType as keyof typeof columns]

const filters = ref({
  global: { value: '', matchMode: 'contains' },
  ...Object.fromEntries(
    specificColumns.map((col: { field?: string }) => [
      col.field,
      { value: null, matchMode: 'contains' },
    ])
  ),
})

const globalFilterFields = computed(() =>
  specificColumns.map((col: { field?: string }) => col.field).filter(Boolean)
)

const disabledShareTypes = [
  'activity',
  'user',
  'card',
  'question',
  'link',
  'feature',
  'technology',
]
const shareEnabled = computed(
  () => !disabledShareTypes.includes(props.adType as string)
)
</script>

<style lang="scss">
@import 'index';
</style>