function activity2() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <p>Learning Objective: Calculate maximum temperature </p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act2();' id='temp-btn-3' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML += text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function start_act2() {
    let temp_btn = document.getElementById('temp-btn-3');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Calculate Maximum Temperature", "tb2-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb2-box'>
        <p style="font-size: 24px; font-weight: 600; text-align: center">Activity 2</p> <br>
        <h5> A steel ball of ${act2_d}cm in diameter and initially at a temperature of ${act2_ini_temp}<sup>o</sup>C is suddenly placed in a controlled environment at ${act2_env_temp}<sup>o</sup>C. Calculate the time required to attain the temperature of ${act2_fin_temp}<sup>o</sup>C. </h5>
        <h5> $$ Take\\ \\ k=${act2_k}w/m-k\\ \\ \\ \\ \\ c_P=${act2_cp}kJ/kg-k $$ </h5>
        <h5> $$ \\rho=${act2_rho}kg/m^3\\ \\ \\ \\ \\ Convective\\ heat\\ transfer\\ (h)=${act2_h}w/m^2-k $$ </h5>
        <br><br>

        <h5>For steel ball,</h5>
        <p style='text-align: center;'> <span style='display: inline-block;' >
            <span style='display: inline-block;' >
                $$ L = \\frac{d}{2} $$
            </span>
        </p>

        <h5>Biot number</h5>
        <p style='text-align: center;'> <span style='display: inline-block;'>
            <span style='display: inline-block;' >
                $$ Bi = \\frac{hL}{k} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal04-inp'> <span id='cal04-val-sp'></span>

            <button class='btn btn-info std-btn' onclick='verify_act2_bi();' id='btn_act2_bi' style="width:20%">Verify</button>
        </p>

        <div id="act2_a" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ Bi < 0.1\\ \\ \\therefore ITG < 5% $$
                    $$ Area\\ (A) = \\frac{\\pi}{4} d^2 $$
                </span>
                <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal05-inp'> <span id='cal05-val-sp'></span> m<sup>2</sup>

                <button class='btn btn-info std-btn' onclick='verify_act2_a();' id='btn_act2_a' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act2_t" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ V = A_s * \\frac{d}{2}\\ \\ \\ \\ \\ \\ A_s\\ -\\ Surface Area $$
                    $$ V = \\frac{4}{3} \\pi  \\frac{d^2}{2} \\frac{d}{2}  $$
                    $$ \\frac{\\theta}{\\theta_0} = e^{\\frac{-hAt}{\\rho C_p V}} $$
                    $$ t = $$
                </span>
                <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal06-inp'> <span id='cal06-val-sp'></span> s

                <button class='btn btn-info std-btn' onclick='verify_act2_t();' id='btn_act2_t' style="width:20%">Verify</button>
            </p>
        </div>

    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations1();
    setTimeout(() => { show_step('tb2-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function internal_calculations1() {
    act2_L = act2_d_val / 2;
    act2_bi = (act2_h * act2_L) / act2_k;
    act2_a = (Math.PI / 4) * act2_d_val;
    act2_v = (4 / 3) * Math.PI * Math.pow((act2_d_val), 2) * act2_d_val / 2;
    act2_theta = act2_fin_temp - act2_env_temp;
    act2_theta0 = act2_ini_temp - act2_env_temp;
    act2_t = (-act2_rho * act2_cp * 1e3 * act2_v) / (act2_h * act2_a) * Math.log(act2_theta / act2_theta0);
    console.log("act2 L= ", act2_L);
    console.log("act2 Bi= ", act2_bi);
    console.log("act2 A= ", act2_a);
    console.log("act2 V= ", act2_v);
    console.log("theta= ", act2_theta);
    console.log("theta= ", act2_theta);
    console.log("act2 theta0= ", act2_theta0);
    console.log("act2 t= ", act2_t);
}
function verify_act2_bi() {
    let btn = document.getElementById('btn_act2_bi');
    let div = document.getElementById('act2_a');
    let inp4 = document.getElementById('cal04-inp');
    let sp4 = document.getElementById('cal04-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp4.value).toFixed(2)), parseFloat(act2_bi.toFixed(2)))) {
        alert('Biot value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp4.remove();
    sp4.innerText = `${(act2_bi).toFixed(4)}`;
    div.style.display = 'block';
}
function verify_act2_a() {
    let btn = document.getElementById('btn_act2_a');
    let div = document.getElementById('act2_t');
    let inp5 = document.getElementById('cal05-inp');
    let sp5 = document.getElementById('cal05-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp5.value).toFixed(2)), parseFloat(act2_a.toFixed(2)))) {
        alert('Area value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp5.remove();
    sp5.innerText = `${(act2_a).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act2_t() {
    let btn = document.getElementById('btn_act2_t');
    let inp6 = document.getElementById('cal06-inp');
    let sp6 = document.getElementById('cal06-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp6.value).toFixed(3)), parseFloat(act2_t.toFixed(3)))) {
        alert('Time value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp6.remove();
    sp6.innerText = `${(act2_t).toFixed(3)}`;
    activity3();
}
//# sourceMappingURL=activity2.js.map