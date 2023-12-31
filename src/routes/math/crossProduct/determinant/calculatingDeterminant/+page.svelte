<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	// import { pageRoute } from './sectionRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
  import Toggle from './Toggle.svelte'
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { SITE_COLOR } from '$lib/theme/colors';
  import { page } from '$app/stores';
  import RowOpMatrix from './RowOpMatrix.svelte';
</script>

<Title hLevel={2} backgroundColor={SITE_COLOR.TitleBG}>
  Calculating Determinant
</Title>
<p>Let's first refresh on elementary row operations.</p>
<fieldset> 
  <b><u>Elementary Row Operation:</u></b>
  <ol>
    <li>
      <b>Row Swap:</b>
      <p>Swap any two rows</p>
    </li>
    <li>
      <b>Scalar Multiplication:</b>
      <p>Multiply a row with a constant<Latex math={' c \\in \\mathbb{R}'}/> </p>
    </li>
    <li>
      <b>Row Sum:</b>
      <p>Add a multiple of one row to another row</p>
    </li>
  </ol>
</fieldset> 
<p>
  Fact 1: Any full-ranks matrix can obtained by applying chains of elementary row operations to the Identity Matrix.
</p>
<p>
  Using Fact 1, we show how to calculate determinant with the following steps:
</p>
<ol>
  <li>
    Show row operation can be represented as a matrix <Latex math={'E'} />.
    <br/>
    <Toggle>
      <RowOpMatrix />
    </Toggle>
  </li>
  <li>
    Show how applying row operation on a matrix <Latex math={'M'} /> affects its determinant. 
    And thus showing <Latex math={'det(EM)=det(E)det(M)'}/>.
    <br />
    <Toggle>

      <p>For matrix of <Latex math={'\\mathbb{R^2}'} />, see <a href={$page.route.id+'/r2'}>Row Ops in <Latex math={'\\mathbb{R^2}'} /></a>
      <p>For matrix of <Latex math={'\\mathbb{R^3}'} />, see <a href={$page.route.id+'/r3'}>Row Ops in <Latex math={'\\mathbb{R^3}'} /></a>
    </Toggle>
  </li>
  <li>
    With Fact 1 and Step 1, we know  <Latex math={'M = E_n E_{n-1} ... E_1'} />. Together with the result of With Step 2,
    we can calculate <Latex math={'det(M)'} /> as: <br /> <Latex math={'det(M) = det(E_n E_{n-1} ... E_1) = det(E_n)det(E_{n-1}) ... det(E_1)'} />.
  </li>
</ol>

