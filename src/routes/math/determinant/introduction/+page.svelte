<script lang='ts'>
	import Title from "$lib/components/PageComp/Title.svelte";
  import Latex from "$lib/components/Latex/Latex.svelte";



</script>

<Title hLevel={1}>Determinant - Introduction</Title>

<p>
  I always have trouble grasping the concept of determinant of a matrix. 
  After some soul searching, I think determinant can be better understood in the following context:
</p>
<fieldset>
<p>
  In a vector space of dimension <Latex math={'n'}/>, given a linear transformation as matrix <Latex math={'M'}/> and a hyper-parallelepiped as matrix <Latex math={'G'}/> with volume <Latex math={'v_g'}/> 
  , if we apply <Latex math={'M'}/> on  <Latex math={'G'}/>, the oriented volume of this transformed hyper-parallelepiped is equal to <Latex math={'\\det(M) * v_g'}/>,

or in mathematical terms:</p>

<Latex center math={'\\text{ oriented volume of } (MG) =  \\det(M) * v_g'}/> 

<p>And if we use the unit hyper-cube <Latex math={'I_n'}/> as the hyper-parallelepiped, then we will get:</p>

<Latex center math={'\\text{ oriented volume of } (MI_n) =  \\text{ volume of } (M) = \\det(M) * 1'}/> 
<Latex center math={'\\Rightarrow  \\det(M) = \\text{ oriented volume of } (M)'}/> 

<p>What this mean is if we treat the linear transformation matrix <Latex math={'M'}/> as a hyper-parallelepiped, the determinant of <Latex math={'M'}/> is the oriented volume of that hyper-parallelepiped <Latex math={'M'}/></p>

</fieldset>

<p>
  In the following sections, we will go over what is linear transformation, oriented volume, and how to calculate determinant and prove its properties.
</p>

