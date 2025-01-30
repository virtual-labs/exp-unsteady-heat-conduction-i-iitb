function activity3() {
    let text = `
    <div class='divide'>
    <div style='margin-top: 2vw;'>
        <br>
        <h4 class="center-text fs-20px fw-600"></h4>

        <div class="fs-16px">
        <p>Learning Objective: Calculate maximum temperature </p>
        </div>

        <button class='btn btn-info std-btn' style='position: relative; left: 50vw;' onclick='start_act3();' id='temp-btn-4' >Next</button>
    </div>
    </div>
    `;
    maindiv.innerHTML += text;
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function start_act3() {
    let temp_btn = document.getElementById('temp-btn-4');
    if (temp_btn) {
        temp_btn.remove();
    }
    let btn_text = get_collapse_btn_text("Calculate Heat Transfer", "tb3-box");
    let text = `
    ${btn_text}
    <div class='collapse divide' style='style='margin-top: 2vw; 'width: 80%; margin: auto;' id='tb3-box'>
        <p style="font-size: 24px; font-weight: 600; text-align: center">Activity 3</p> <br>
        <h5> A metal rod of ${act3_d}mm in diameter, ${act3_l}m long originally at a temperature of ${act3_ini_temp}<sup>o</sup>C is suddenly dipped in oil at ${act3_oil_temp}<sup>o</sup>C of h=${act3_h}w/m-k. Use lumped capacity analysis if applicable. determine time required to reach the temperature of ${act3_fin_temp}<sup>o</sup>C. </h5>
        <h5> $$ Take\\ \\ \\rho=${act3_rho}kg/m^3\\ \\ \\ \\ \\ c_P=${act3_cp}J/kg-k\\ \\ \\ \\ \\ k=${act3_k}w/m-k $$ </h5>
        <br>

        <h5>For cylinder,</h5>
        <p style='text-align: center;'> <span style='display: inline-block;' >
            <span style='display: inline-block;' >
                $$ L = \\frac{d}{2} $$
            </span>
            = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal07-inp'> <span id='cal07-val-sp'></span> m

            <button class='btn btn-info std-btn' onclick='verify_act3_l();' id='btn_act3_l' style="width:25%">Verify</button>
        </p>

        <div id="act3_bi" style="display: none">
            <h5>Biot number</h5>
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ Bi = \\frac{hL}{k} $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal08-inp'> <span id='cal08-val-sp'></span>

                <button class='btn btn-info std-btn' onclick='verify_act3_bi();' id='btn_act3_bi' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act3_as" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;' >
                <span style='display: inline-block;' >
                    $$ A_s = \\pi d l $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal09-inp'> <span id='cal09-val-sp'></span> m<sup>2</sup>

                <button class='btn btn-info std-btn' onclick='verify_act3_as();' id='btn_act3_as' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act3_rth" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;' >
                <span style='display: inline-block;' >
                    $$ R_{th} = \\frac{1}{h A_s} $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal10-inp'> <span id='cal10-val-sp'></span> k/w

                <button class='btn btn-info std-btn' onclick='verify_act3_rth();' id='btn_act3_rth' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act3_cth" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;' >
                <span style='display: inline-block;' >
                    $$ C_{th} = \\rho c_P V $$
                    $$ C_{th} = \\rho c_P (\\frac{\\pi}{4} d^2 l) $$
                </span>
                = <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal11-inp'> <span id='cal11-val-sp'></span> k/w

                <button class='btn btn-info std-btn' onclick='verify_act3_cth();' id='btn_act3_cth' style="width:20%">Verify</button>
            </p>
        </div>

        <div id="act3_t" style="display: none">
            <p style='text-align: center;'> <span style='display: inline-block;'>
                <span style='display: inline-block;' >
                    $$ \\frac{\\theta}{\\theta_0} = e^{\\frac{-t}{R_{th}\\ C_{th}}} $$
                    $$ t = $$
                </span>
                <input type='number' class='form-control' style='display: inline !important; width: 120px;' id='cal12-inp'> <span id='cal12-val-sp'></span> s

                <button class='btn btn-info std-btn' onclick='verify_act3_t();' id='btn_act3_t' style="width:20%">Verify</button>
            </p>
        </div>

    </div>

    `;
    maindiv.innerHTML += text;
    internal_calculations2();
    setTimeout(() => { show_step('tb3-box'); }, 150);
    setTimeout(() => { MathJax.typeset(); }, 300);
}
function internal_calculations2() {
    act3_L = act3_d_val / 2;
    act3_bi = (act3_h * act3_L) / act3_k;
    act3_as = Math.PI * act3_d_val * act3_l;
    act3_rth = 1 / (act3_h * act3_as);
    act3_cth = act3_rho * act3_cp * (Math.PI / 4 * Math.pow(act3_d_val, 2) * act3_l);
    act3_theta = act3_fin_temp - act3_oil_temp;
    act3_theta0 = act3_ini_temp - act3_oil_temp;
    act3_t = -(act3_rth * act3_cth * Math.log(act3_theta / act3_theta0));
    console.log("act3 L= ", act3_L);
    console.log("act3 Bi= ", act3_bi);
    console.log("act3 As= ", act3_as);
    console.log("act3 Rth= ", act3_rth);
    console.log("act3 Cth= ", act3_cth);
    console.log("act3 theta= ", act3_theta);
    console.log("act3 theta0= ", act3_theta0);
    console.log("act3 t= ", act3_t);
}
function verify_act3_l() {
    let btn = document.getElementById('btn_act3_l');
    let div = document.getElementById('act3_bi');
    let inp7 = document.getElementById('cal07-inp');
    let sp7 = document.getElementById('cal07-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp7.value).toFixed(3)), parseFloat(act3_L.toFixed(3)))) {
        alert('L value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp7.remove();
    sp7.innerText = `${(act3_L).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act3_bi() {
    let btn = document.getElementById('btn_act3_bi');
    let div = document.getElementById('act3_as');
    let inp8 = document.getElementById('cal08-inp');
    let sp8 = document.getElementById('cal08-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp8.value).toFixed(2)), parseFloat(act3_bi.toFixed(2)))) {
        alert('Biot value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp8.remove();
    sp8.innerText = `${(act3_bi).toFixed(4)}`;
    div.style.display = 'block';
}
function verify_act3_as() {
    let btn = document.getElementById('btn_act3_as');
    let div = document.getElementById('act3_rth');
    let inp9 = document.getElementById('cal09-inp');
    let sp9 = document.getElementById('cal09-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp9.value).toFixed(2)), parseFloat(act3_as.toFixed(2)))) {
        alert('Surface Area value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp9.remove();
    sp9.innerText = `${(act3_as).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act3_rth() {
    let btn = document.getElementById('btn_act3_rth');
    let div = document.getElementById('act3_cth');
    let inp10 = document.getElementById('cal10-inp');
    let sp10 = document.getElementById('cal10-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp10.value).toFixed(2)), parseFloat(act3_rth.toFixed(2)))) {
        alert('Rth value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp10.remove();
    sp10.innerText = `${(act3_rth).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act3_cth() {
    let btn = document.getElementById('btn_act3_cth');
    let div = document.getElementById('act3_t');
    let inp11 = document.getElementById('cal11-inp');
    let sp11 = document.getElementById('cal11-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp11.value).toFixed(2)), parseFloat(act3_cth.toFixed(2)))) {
        alert('Cth value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp11.remove();
    sp11.innerText = `${(act3_cth).toFixed(3)}`;
    div.style.display = 'block';
}
function verify_act3_t() {
    let btn = document.getElementById('btn_act3_t');
    let inp12 = document.getElementById('cal12-inp');
    let sp12 = document.getElementById('cal12-val-sp');
    if (!verify_values(parseFloat(parseFloat(inp12.value).toFixed(3)), parseFloat(act3_t.toFixed(3)))) {
        alert('Time value is incorrect, calculate again.');
        return;
    }
    btn.remove();
    inp12.remove();
    sp12.innerText = `${(act3_t).toFixed(3)}`;
    exp_complete();
}
function exp_complete() {
    alert('Experiment completed');
}
//# sourceMappingURL=activity3.js.map