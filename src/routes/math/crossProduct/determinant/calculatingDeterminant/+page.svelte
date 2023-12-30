<script lang="ts">
	import type { IRoute } from '$lib/components/Route/route';
	import { onMount } from 'svelte';
	// import { pageRoute } from './sectionRoute';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Title from '$lib/components/PageComp/Title.svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
	import { SITE_COLOR } from '$lib/theme/colors';

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
  Using Fact 1, we explain the how to calculate determinant with the following steps:
</p>
<ol>
  <li>
    Show row operation can be represented as a matrix <Latex math={'E'} />
  </li>
  <li>
    Understand how a row operation applied on a matrix <Latex math={'M'} /> affects its determinant.
    <br /> In other words we want to show how to get <Latex math={'det(E)'}/>
    and show that <Latex math={'det(EM)=det(E)det(M)'} />.   
  </li>

  <li>
    Using Fact 1 and Step 1., we know  <Latex math={'M = E_n E_{n-1} ... E_1'} />,
    so can get <Latex math={'det(M) = det(E_n E_{n-1} ... E_1) = det(E_n)det(E_{n-1}) ... det(E_1)'} />
  </li>
  <!-- <li>
    <b>Linear Transformation:</b> We show how linear transformation can be expressed as a matrix.
  </li>
  <li>
    <b>Row Ops as Matrix:</b> We show how to express elementary row operation as a matrix.
  </li> -->
  <li>
    <b>Row Ops in <Latex math={'\\mathbb{R^2}'}/>: </b>We show how elementary row operations affect the determinant of a matrix in <Latex math={'\\mathbb{R^2}'}/>.
  </li>
  <li>
    <b>Row Ops in <Latex math={'\\mathbb{R^3}'}/>: </b>We show how elementary row operations affect the determinant of a matrix in <Latex math={'\\mathbb{R^3}'}/>.
  </li>
</ol>

