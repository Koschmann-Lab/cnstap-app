<template>
    <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Category</th>
              <th class="text-left">Description of Points</th>
              <th class="text-center">Weight</th>
              <th class="text-center">Range of Points</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <td style="font-weight:bold;">Pre-Clinical Data (in vitro)</td>
            <td>0 = No data<br>1 = Activity against any cell type<br>2 = Activity against primary CNS tumor cell type
            </td>
            <td>2</td>
            <td>0 to 4</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Pre-Clinical Data (in vivo)</td>
            <td>0 = No data<br>1 = Activity against cells grafted into the flank<br>2 = Activity against orthotopic cells or cells grafted into the brain
            </td>
            <td>3</td>
            <td>0 to 6</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Phase I Safety Data</td>
            <td>0 = No data<br>1 = Ongoing pediatric clinical trial<br>2 = Published phase I trial with phase I dosing
            </td>
            <td>3</td>
            <td>0 to 6</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">CNS Data with Response</td>
            <td>−2 = Evidence of lack of positive response of primary CNS tumors<br>−1 = Evidence of lack of positive response of brain metastasis<br>0 = No data<br>1 = Evidence of positive response of a brain metastasis<br>2 = Evidence of positive response of a primary CNS tumor
            </td>
            <td>5</td>
            <td>-10 to 10</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Brain Penetration</td>
            <td>0 = Insufficient CNS penetration<br>1 = &lt; 5% CNS penetration but Cmax above IC50<br>2 = > 5% CNS penetration and Cmax above IC50
            </td>
            <td>5</td>
            <td>0 to 10</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">FDA Approval</td>
            <td>0 = Compassionate care or No FDA approval<br>1 = FDA approval
            </td>
            <td>10</td>
            <td>0 to 10</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Clonality/variant allele fraction (%)</td>
            <td>0 = No data or Pathway is non-dominant mutation<br>1 = Pathway is dominant mutation<br> 2 = fusion
            </td>
            <td>5</td>
            <td>0 to 10</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Variant Tier Score</td>
            <td>0 = Tier IV<br>1 = Tier III<br>2 = Tier I or Tier II
            </td>
            <td>3</td>
            <td>0 to 6</td>
          </tr>
          <tr>
            <td style="font-weight:bold;">Relevant Clinical Trial</td>
            <td>0 = No clinical trial considered<br>1 = Clinical trial is available that the patient is eligible for and willing to travel to
            </td>
            <td>20</td>
            <td>0 to 20</td>
          </tr>
        </tbody>
        </template>
  </v-simple-table>
</template>

<script>

export default {
  name: 'Algorithm',
  components: {
  }
}
</script>
