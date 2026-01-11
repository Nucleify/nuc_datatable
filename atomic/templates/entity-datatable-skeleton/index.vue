<template>
  <ad-data-table
    v-if="props.loading"
    :value="props.rows"
    size="small"
    filter-display="row"
    class="entity-datatable skeleton-data-table"
  >
    <Column
      v-if="props.enableShare"
      class="share-checkbox-column"
    >
      <template #header>
        <ad-skeleton
          :loading="props.loading"
          width="24px"
          height="24px"
        />
      </template>
      <template #body>
        <ad-skeleton
          :loading="props.loading"
          width="24px"
          height="24px"
        />
      </template>
    </Column>
    <Column
      v-for="(col, index) in props.specificColumns"
      :key="index"
      :class="col.class"
    >
      <template #header>
        <ad-skeleton
          :loading="props.loading"
          width="100%"
          height="22px"
        />
      </template>
      <template #filter>
        <ad-skeleton
          :loading="props.loading"
          width="100%"
          height="22px"
        />
      </template>
      <template #body>
        <ad-skeleton 
          :loading="props.loading" 
          height="34px" 
        />
      </template>
    </Column>
    <Column class="action-column">
      <template #body>
        <div class="action-column-content">
          <ad-skeleton
            v-for="index in 3"
            :key="index"
            :loading="props.loading"
            class="desktop"
            shape="circle"
            width="34px"
            height="34px"
          />
          <ad-skeleton
            :loading="props.loading"
            class="mobile"
            shape="circle"
            width="34px"
            height="34px"
          />
        </div>
      </template>
    </Column>
  </ad-data-table>
</template>

<script setup lang="ts">
import type { NucSkeletonDataTableInterface } from 'atomic'

const props = defineProps<NucSkeletonDataTableInterface>()
</script>
