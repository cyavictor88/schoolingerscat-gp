<script lang='ts'>
  // example: <ColsVec cols={['a','b']} dim={4}/>
  // gives:  [ a_1 -> a_4 , b_1 -> b_4 ]
  import Latex from '$lib/components/Latex/Latex.svelte';
	export let cols: string[] = ['a'];
  export let dim: number = 3;
  export let center = false;
  $: rowsStr = Array.from({length:dim}, (v,rowIdx) => {
    const rowStrList = Array.from({length:cols.length}, (v,idx)=>{
      const letter = cols[idx]
      if(idx+1 === cols.length) return rowIdx===dim-1? `${letter}_${rowIdx+1}`: `${letter}_${rowIdx+1} \\\\`;
      return `${letter}_${rowIdx+1} &`
    });
    return rowStrList.join(' ');
  })
  $: mathStr = `\\begin{bmatrix} ${rowsStr.join(' ')} \\end{bmatrix}`
  
</script>
<Latex math={mathStr} center={center} />


