
<script lang='ts'>
  import Katex from "$lib/components/Katex/Katex.svelte";
  import innerProduct2D from "$lib/assets/fourierSeries/innerProduct/innerProduct2D.svg";
</script>

<p>Given two <Katex math={'\\mathbb{R}^2'} /> vectors, <Katex math={'\\vec{a}=(a_x,a_y)'} /> and <Katex math={'\\vec{b}=(b_x,b_y)'} />, as shown in Figure 1, you can see that
<Katex math={'\\theta'} />, the angle between <Katex math={'\\vec{a}'} /> and <Katex math={'\\vec{b}'} /> indicates how closely aligned these two vectors are.</p>

<div style='display: flex; flex-flow: column nowrap; align-items:center;'>
<p>Figure 1</p>
<object title='vectors in R^2' width="25%" type="image/svg+xml" data={innerProduct2D}>Boo your browser does not support SVGs</object>
</div>


<p>The formula for inner product of any two <Katex math={'\\mathbb{R}^2'}/> vectors <Katex math={'\\vec{a}'}/> and <Katex math={'\\vec{b}'}/> is the following:</p>                  
<strong>
Inner Product in <Katex math={'\\mathbb{R}^2'}/>: 
</strong>
<Katex displayMode={true} math={'\\mathrm{for} \\; \\vec{a}:= \\left[\\begin{array}{c} a_x \\\\ a_y \\end{array} \\right] \\; \\mathrm{and} \\; \\vec{b}:= \\left[\\begin{array}{c} b_x \\\\ b_y \\end{array}\\right]'} />
<Katex displayMode={true}
   math={"<\\vec{a},\\vec{b}>:= \\vec{a}^T \\vec{b} ="+
   " \\left[\\begin{array}{cc}a_x & a_y \\end{array}\\right]"+
   "\\left[\\begin{array}{c}b_x \\\\ b_y \\end{array}\\right]=a_x\\,b_x+a_y\\,b_y"}
/>
<!-- <p>
   Ok, so what is the purpose of inner product? The way I see it, the inner product of two vectors indicated how closely aligned 
   those two vectors are, assuming the magnitudes of those two vectors are fixed. Two things to clarify here:
</p>
<p>
   1. How closely aligned two vectors are can be reisented by the angle or the cosine of the 
   angle between the two vectors, as shown in Figure 1. 
</p>
<p>
   2.  What I mean by having fixed magnitude vectors is that if given a vector \( \vec{v} \) and a set of vectors that have the same 
   length as \( \vec{v} \) but with different orientations, the greater the inner product of \( \vec{v} \) and a vector from that set, the more 
   closely aligned that vector is to \( \vec{v} \) compare to other vectors in that set.
</p>
   
   
<p>
   Let me show you how the formula of inner product of two vectors is related to the cosine angle between the two vectors using Figure 1. 
   In Figure 1, it shows two vectors, \( \vec{a} \) and \(\vec{b} \), with \(\theta\) indicates the angle between twop vectors and \(d\) indicates the distance between two vectos. 
</p>


<div class="row p-0">
    <div class="col">
    </div>

    <div class="col">
        <h4>Figure 1</h4>
        <object width="75%" type="image/svg+xml" data="{% static 'notes/svg/f1-inner-product-2d.svg' %}">Boo your browser does not support SVGs</object>
        
    </div>

    <div class="col">
    </div>

</div>


<p> To relate angle \(\theta\) with \(\vec{a}\) and \(\vec{b}\), we will utilize \(d\) to achieve such goal. 
   There are two methods to solve for \(d\), and by equating those two methods(equations), we can get the desire formula that shows 
   the relatoin between \(\theta\) and \(\vec{a}\),\(\vec{b}\).
</p>
<i>
Method 1: Law of Cosine </i>

 <p> 
    As shown in Figure 2, by employing law of cosine on the triangle in the figure, we can get \(d\) as follows:
</p>


<div class="row p-0">
    <div class="col">
        $$\color{Bittersweet}{d^2} \color{black}{=} \color{red}{\| \vec{a}  \|^2} \color{black}{+} \color{blue}{\| \vec{b}  \|^2} \color{black}{ - 2 \| \vec{a}  \| \|\vec{b}\| cos(\theta) } $$
        
        $$ \mathrm{where} \ \color{red}{\| \vec{a}  \|^2 = a_x^2+a_y^2} \color{black}{\quad \mathrm{and \quad }}  \color{blue}{\| \vec{b}  \|^2 = b_x^2+b_y^2} $$
        $$\Rightarrow \color{Bittersweet}{d^2} \color{black}{=} \color{red}{a_x^2+a_y^2} \color{black}{+} \color{blue}{b_x^2+b_y^2} \color{black}{ - 2 \| \vec{a}  \| \|\vec{b}\| cos(\theta) } $$
    </div>
            
    <div class="col">
        <h4>Figure 2</h4>
        <object width="75%" type="image/svg+xml" data="{% static 'notes/svg/f2-inner-product-2d-detail.svg' %}">Boo your browser does not support SVGs</object>
        
    </div>

</div>
<i>
Method 2: Make a Right Triangle </i>
<p> As shown in Figure 3, we can use the x,y coordinates of \(\vec{a},\vec{b}\) to construct the brown right triangle, and use it to get \(d\) as follows: </p>
   
<div class="row p-0">
    <div class="col">

        $$ \color{Bittersweet}{d^2} = \color{Purple}{|a_x-b_x|^2}+\color{TealBlue}{|a_y-b_y|^2} \color{Bittersweet} {=(a_x-b_x)^2+(a_y-b_y)^2}  $$
    <p>Now we equate the formulas for \(d\) from Method 1 and Method 2 and simplify as follows: </p>
        $$\color{Bittersweet}{d^2=(a_x-b_x)^2+(a_y-b_y)^2} \color{black}{=} \color{red}{a_x^2+a_y^2} \color{black}{+} \color{blue}{b_x^2+b_y^2} \color{black}{ - 2 \| \vec{a}  \| \|\vec{b}\| cos(\theta) } $$
        $$\Rightarrow \color{black}{ (a_x-b_x)^2+(a_y-b_y)^2} \color{black}{=} \color{red}{a_x^2+a_y^2} \color{black}{+} \color{blue}{b_x^2+b_y^2} \color{black}{ - 2 \| \vec{a}  \| \|\vec{b}\| cos(\theta) } $$
        $$\Rightarrow  a_x^2+b_x^2-2a_xb_x +a_y^2+b_y^2-2a_yb_y= \color{red}{a_x^2+a_y^2} \color{black}{+} \color{blue}{b_x^2+b_y^2} \color{black}{ - 2 \| \vec{a}  \| \|\vec{b}\| cos(\theta) } $$
        $$\Rightarrow \cancel{a_x^2}+\cancel{b_x^2}-2a_xb_x +\cancel{a_y^2}+\cancel{b_y^2}-2a_yb_y= \color{red}{\cancel{a_x^2}+\cancel{a_y^2}} \color{black}{+} \color{blue}{\cancel{b_x^2}+\cancel{b_y^2}} \color{black}{ - 2 \| \vec{a}  \| \|\vec{b}\| cos(\theta) } $$
        $$\Rightarrow -2a_xb_x-2a_yb_y = -2 \| \vec{a}  \| \|\vec{b}\| cos(\theta) $$
        $$\Rightarrow a_xb_x+a_yb_y = < \vec{a},\vec{b}> = \| \vec{a}  \| \|\vec{b}\| cos(\theta) $$
        $$\Rightarrow cos(\theta)   = \frac{< \vec{a},\vec{b}>}{  \| \vec{a}  \| \|\vec{b}\| } $$
        <p>
        There you have it, the formula above shows how the cosine of the angle between two vectors can be exissed using inner product.
        </p>
    </div>

    <div class="col">
        <h4>Figure 3</h4>
        <object width="100%" type="image/svg+xml" data="{% static 'notes/svg/f3-inner-product-2d-detail2.svg' %}">Boo your browser does not support SVGs</object>
        
    </div>

</div>  -->