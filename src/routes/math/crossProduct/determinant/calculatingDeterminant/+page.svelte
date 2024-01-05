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
      <b>Scalar Multiplication:</b>
      <p>Multiply a row with a constant<Latex math={' c \\in \\mathbb{R}'}/> </p>
    </li>
    <li>
      <b>Row Sum:</b>
      <p>Add a multiple of one row to another row</p>
    </li>
    <li>
      <b>Row Swap:</b>
      <p>Swap any two rows</p>
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
      <p>If you want to some refresh on linear transformation and matrix, see <a href={$page.route.id+'/linearTransformation'}>Linear Transformation</a> </p>
      <RowOpMatrix />
    </Toggle>
  </li>
  <li>
    Show how applying row operation on a matrix <Latex math={'M'} /> affects its determinant. 
    And thus showing <Latex math={'det(EM)=det(E)det(M)'}/>.
    <br />
    <Toggle>

      <p>For matrix in <Latex math={'\\mathbb{R^2}'} />, see <a href={$page.route.id+'/r2'}>Row Ops in <Latex math={'\\mathbb{R^2}'} /></a>
      <p>For matrix in <Latex math={'\\mathbb{R^3}'} />, see <a href={$page.route.id+'/r3'}>Row Ops in <Latex math={'\\mathbb{R^3}'} /></a>
    </Toggle>
  </li>
  <li>
    With Fact 1 and Step 1, we know  <Latex math={'M = E_n E_{n-1} ... E_1'} />.<br />
    So given a <Latex math={'M'} />, how do we find <Latex math={'det(M)'}/>?<br/> 
    <b>a.</b> We first apply row reduction to find row operations matrices (<Latex math={`F_1,F_2,...F_n`}/>) such that :
    <Latex center math={`F_n...F_2F_1M = I` } />
    <b>b.</b> Next, by applying the inverse of those row operation matrices, we can decompose <Latex math={'M'}/> into a series of row operations:
    <Latex center math={`\\rightarrow F_{n-1}...F_1F_2M = F_n^{-1}I` } />
    <Latex center math={`\\rightarrow F_{n-2}...F_1F_2M = F_{n-1}^{-1}F_n^{-1}I` } />
    <Latex center math={`\\vdots` } />
    <Latex center math={`\\Rightarrow M = F_1^{-1}F_2^{-1}...F_n^{-1}I` } />
    <p><b>c.</b> Then we can define the <Latex math={'E'} /> matrices as: </p>
    <Latex center math={`\\Rightarrow E_1 = F_n^{-1}, E_2 = F_{n-1}^{-1} ,...,E_n =F_1^{-1}` } />
    <p>such that:</p>
    <Latex center math={`M = E_n E_{n-1} ... E_1 ` } />

    <b>d.</b> Using Step 2, We then can calculate <Latex math={'det(M)'} /> as: <br /> <Latex center math={'det(M) = det(E_n E_{n-1} ... E_1) = det(E_n)det(E_{n-1}) ... det(E_1)'} />
  </li>
</ol>

