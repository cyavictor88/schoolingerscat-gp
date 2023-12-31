<script lang="ts">
	import { onMount } from 'svelte';
	import Latex from '$lib/components/Latex/Latex.svelte';
</script>
<div style='border: 1px solid black'>
  <p>We can easily express any row operation as matrix <Latex math={'E'} /> by simply apply the row op on the Identity matrix.</p>

  <p><b>Examples:</b></p>

  <ul>
    <li>
      <b>Row Swap:</b><br />
      <p>Say we want to create a matrix that can swap row 2 and row 3 (<Latex math={'r_2 \\leftrightarrow r_3'}/>),</p>
      <p>We can just swap row 2 and row 3 of the Identity matrix:</p>
      <Latex math={`E=
      \\begin{bmatrix}
      1 & 0 & 0 \\\\
      0 & 1 & 0 \\\\
      0 & 0 & 1 \\\\
      \\end{bmatrix}_{r_2 \\leftrightarrow r_3} = 
      \\begin{bmatrix}
      1 & 0 & 0 \\\\
      0 & 0 & 1 \\\\
      0 & 1 & 0 \\\\
      \\end{bmatrix}`}/>
      <p><Latex math={`E`} /> in action:</p>
       <Latex math={`E 
       \\begin{bmatrix}
       a & b & c \\\\
       d & e & f \\\\
       g & h & i \\\\
       \\end{bmatrix} = 
       \\begin{bmatrix}
      1 & 0 & 0 \\\\
      0 & 0 & 1 \\\\
      0 & 1 & 0 \\\\
      \\end{bmatrix}
      \\begin{bmatrix}
       a & b & c \\\\
       d & e & f \\\\
       g & h & i \\\\
       \\end{bmatrix} =
       \\begin{bmatrix}
       a & b & c \\\\
       g & h & i \\\\
       d & e & f \\\\
       \\end{bmatrix}
       `} />
       <br />
       <br />

    </li>
    <li>
      <b>Scalar Multiplication:</b><br />
      <p>Say we want to create a matrix that can multiply row 2 by 9 (<Latex math={'r_2 \\rightarrow 9r_2'}/>),</p>
      <p>We can just multiply row 2 by 9 on the Identity matrix:</p>
      <Latex math={`E=
      \\begin{bmatrix}
      1 & 0 & 0 \\\\
      0 & 1 & 0 \\\\
      0 & 0 & 1 \\\\
      \\end{bmatrix}_{r_2 \\rightarrow 9r_2} = 
      \\begin{bmatrix}
      1 & 0 & 0 \\\\
      0 & 9 & 0 \\\\
      0 & 0 & 1 \\\\
      \\end{bmatrix}`}/>
      <p><Latex math={`E`} /> in action:</p>
       <Latex math={`E 
       \\begin{bmatrix}
       a & b & c \\\\
       d & e & f \\\\
       g & h & i \\\\
       \\end{bmatrix} = 
       \\begin{bmatrix}
      1 & 0 & 0 \\\\
      0 & 9 & 0 \\\\
      0 & 0 & 1 \\\\
      \\end{bmatrix}
      \\begin{bmatrix}
       a & b & c \\\\
       d & e & f \\\\
       g & h & i \\\\
       \\end{bmatrix} =
       \\begin{bmatrix}
       a & b & c \\\\
       9d & 9e & 9f \\\\
       g & h & i \\\\
       \\end{bmatrix}
       `} />
       <br />
       <br />
    </li>
    <li>
      <b>Row Sum:</b><br />
      <p>Say we want to create a matrix that can add row 2 multiply by 3 to row 1(<Latex math={'r_1 \\rightarrow r_1 + 3r_2'}/>),</p>
      <p>We can just multiply row 2 by 3 and add to row 1 on the Identity matrix:</p>
      <Latex math={`E=
      \\begin{bmatrix}
      1 & 0 & 0 \\\\
      0 & 1 & 0 \\\\
      0 & 0 & 1 \\\\
      \\end{bmatrix}_{r_1 \\rightarrow r_1 + 3r_2} = 
      \\begin{bmatrix}
      1 & 3 & 0 \\\\
      0 & 1 & 0 \\\\
      0 & 0 & 1 \\\\
      \\end{bmatrix}`}/>
      <p><Latex math={`E`} /> in action:</p>
       <Latex math={`E 
       \\begin{bmatrix}
       a & b & c \\\\
       d & e & f \\\\
       g & h & i \\\\
       \\end{bmatrix} = 
       \\begin{bmatrix}
      1 & 3 & 0 \\\\
      0 & 1 & 0 \\\\
      0 & 0 & 1 \\\\
      \\end{bmatrix}
      \\begin{bmatrix}
       a & b & c \\\\
       d & e & f \\\\
       g & h & i \\\\
       \\end{bmatrix} =
       \\begin{bmatrix}
       a+3d & b+3e & c+3f \\\\
       d & e & f \\\\
       g & h & i \\\\
       \\end{bmatrix}
       `} />
       <br />
       <br />

    </li>
  </ul>
</div>