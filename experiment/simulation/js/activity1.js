let maindiv = document.getElementById('pannelcreate');
function activity1() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <h5>Unsteady state heat conduction I </h5>
        <p>Learning Objective: Calculate the temperature</p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act1();' id='temp-btn-1' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML = text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
//for starting first activity
function start_act1() {
    let temp_btn = document.getElementById('temp-btn-1');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Caculate Temperature", "tb1-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb1-box'>
        <p style="font-size: 24px; font-weight: 600; text-align: center">Activity 1</p> <br>
        <h5> A ${act1_diam} x ${act1_diam} copper slab of ${act1_b}cm thick is at a uniform temperature of ${act1_uni_temp}<sup>o</sup>C. It is suddenly placed in an envioronment maintained at ${act1_env_temp}<sup>o</sup>C. Given that slab density is ${act1_rho}kg/m<sup>3</sup>, its specific heat is ${act1_cp}kJ/k of k, thermal conductivity is ${act1_k}w/m-k and the convective heat transfer coefficient of environment ${act1_h}w/m<sup>2</sup>k. Determine the time at which the slab attains temperature of ${act1_slab_temp}<sup>o</sup>C. The surface of both sides are taking part in convection. </h5>
        <br><br>

        <h5>For slab,</h5>
        <p style='text-align: center;'> <span style='display: inline-block;' >
            <span style='display: inline-block;' >
                $$ L = \\frac{b}{2} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal01-inp'> <span id='cal01-val-sp'></span> m

            <button class='btn btn-info std-btn' onclick='verify_act1_l();' id='btn_act1_l' style="width:25%">Verify</button>
        </p>

        <div id="act1_bi" style="display: none">
            <h5>Biot number</h5>
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ Bi = \\frac{hL}{k} $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal02-inp'> <span id='cal02-val-sp'></span>

                <button class='btn btn-info std-btn' onclick='verify_act1_bi();' id='btn_act1_bi' style="width:20%">Verify</button>
            </p>
        </div>
        
        <div id="act1_t" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ Bi < 0.1\\ \\ \\therefore ITG < 5% $$
                    $$ \\frac{\\theta}{\\theta_0} = e^{\\frac{-hAt}{\\rho C_p V}} $$
                    $$ \\frac{\\theta}{\\theta_0} = e^{\\frac{-hAt}{\\rho C_p A b}} $$
                    $$ t = $$
                </span>
                <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal03-inp'> <span id='cal03-val-sp'></span> s

                <button class='btn btn-info std-btn' onclick='verify_act1_t();' id='btn_act1_t' style="width:20%">Verify</button>
            </p>
        </div>
    </div>
    `;
    maindiv.innerHTML += text;
    hide_all_steps();
    setTimeout(() => { show_step('tb1-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
    internal_calculations();
}
function internal_calculations() {
    act1_L = act1_b_val / 2;
    act1_bi = (act1_h * act1_L) / act1_k;
    act1_theta = act1_slab_temp - act1_env_temp;
    act1_theta0 = act1_uni_temp - act1_env_temp;
    act1_t = (-act1_rho * act1_cp_val * act1_b_val) / act1_h * Math.log(act1_theta / act1_theta0);
    console.log("act1 L= ", act1_L);
    console.log("act1 Bi= ", act1_bi);
    console.log("theta= ", act1_theta);
    console.log("act1 theta0= ", act1_theta0);
    console.log("act1 t= ", act1_t);
}
function verify_act1_l() {
    let btn = document.getElementById('btn_act1_l');
    let div = document.getElementById('act1_bi');
    let inp1 = document.getElementById('cal01-inp');
    let sp1 = document.getElementById('cal01-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp1.value).toFixed(3)), parseFloat(act1_L.toFixed(3)))) {
        alert('L value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp1.remove();
    sp1.innerText = `${(act1_L).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act1_bi() {
    let btn = document.getElementById('btn_act1_bi');
    let div = document.getElementById('act1_t');
    let inp2 = document.getElementById('cal02-inp');
    let sp2 = document.getElementById('cal02-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp2.value).toFixed(2)), parseFloat(act1_bi.toFixed(2)))) {
        alert('Biot value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp2.remove();
    sp2.innerText = `${(act1_bi).toFixed(4)}`;
    div.style.display = 'block';
}
function verify_act1_t() {
    let btn = document.getElementById('btn_act1_t');
    let inp3 = document.getElementById('cal03-inp');
    let sp3 = document.getElementById('cal03-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp3.value).toFixed(3)), parseFloat(act1_t.toFixed(3)))) {
        alert('Time value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp3.remove();
    sp3.innerText = `${(act1_t).toFixed(3)}`;
    activity2();
}
activity1();
//# sourceMappingURL=activity1.js.map