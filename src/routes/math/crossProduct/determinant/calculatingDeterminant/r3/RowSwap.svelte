<script lang="ts">
	import Toggle from '../Toggle.svelte';
  import Latex from '$lib/components/Latex/Latex.svelte';

</script>

<Toggle>
	<div style='padding: 4px; border: 1px black solid'>
		<p>
			Swapping row only changes the orientation of the parallelepiped:
		</p>
    <p>
      If <Latex math={`M'`} /> is formed by swapping two rows in <Latex math={'M'} />, then
      <Latex math={`det(M')=-det(M)`} />
    </p>
    <p>Instead of of using graphs and figure. Let's just use the result of Row Sum and Scalar Multiplication to show why <Latex math={`det(M')=-det(M)`} /> for any size of <Latex math={'M'} />: </p>
    <p>
      Suppose we have: 


    </p>
    <Latex  center
  math={`M = \\begin{bmatrix}

              row_1 \\\\
             \\vdots \\\\
             row_i \\\\
             \\vdots \\\\
             row_j \\\\
             \\vdots \\\\

             row_n \\\\
              \\end{bmatrix} 
                `}
  />
<ul>

  <li>
    <b>Step 1: do <Latex math={'row_i \\rightarrow row_i + row_j'} /></b>
    <Latex  center
    math={`\\rightarrow M_1 = \\begin{bmatrix}
  
                row_1 \\\\
               \\vdots \\\\
               row_i + row_j \\\\
               \\vdots \\\\
               row_j \\\\
               \\vdots \\\\
  
               row_n \\\\
                \\end{bmatrix} 
                  `}
    />
    since we know Row Sum does not affect determinant, so  <Latex math={'det(M_1)=det(M)'} />

  </li>
  <br />
  <li>
    <b>Step 2: do <Latex math={'row_j \\rightarrow row_j - row_i'} /></b>
    <Latex  center
    math={`\\rightarrow M_2 = \\begin{bmatrix}
  
                row_1 \\\\
               \\vdots \\\\
               row_i + row_j \\\\
               \\vdots \\\\
               -row_i \\\\
               \\vdots \\\\
  
               row_n \\\\
                \\end{bmatrix} 
                  `}
    />
    since we know Row Sum does not affect determinant, so <Latex math={'det(M_2)=det(M_1)=det(M)'} />

  </li>
  <br />
  <li>
    <b>Step 3: do <Latex math={'row_i \\rightarrow row_i + row_j'} /></b>
    <Latex  center
    math={`\\rightarrow M_3 = \\begin{bmatrix}
  
                row_1 \\\\
               \\vdots \\\\
               row_j \\\\
               \\vdots \\\\
               -row_i \\\\
               \\vdots \\\\
  
               row_n \\\\
                \\end{bmatrix} 
                  `}
    />
    since we know Row Sum does not affect determinant, so <Latex math={'det(M_3)=det(M_2)=det(M_1)=det(M)'} />

  </li>
  <br />
  <li>
    <b>Step 4: do <Latex math={'row_j \\rightarrow -1 * row_j'} /></b>
    <Latex  center
    math={`\\rightarrow M' = \\begin{bmatrix}
  
                row_1 \\\\
               \\vdots \\\\
               row_j \\\\
               \\vdots \\\\
               row_i \\\\
               \\vdots \\\\
  
               row_n \\\\
                \\end{bmatrix} 
                  `}
    />
    using Scalar Multiplication with the constant -1 , we have <Latex math={`det(M')=-1 * det(M_3)=-1 * det(M_2)=-1 * det(M_1)=-1 * det(M)`} />
<Latex center math={`\\Rightarrow det(M')=-det(M)`}/>
  </li>
  <br />
</ul>
    <!-- https://math.vanderbilt.edu/sapirmv/msapir/proofdet1.html -->
        
	</div>
</Toggle>
