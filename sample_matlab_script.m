% Transformation from classical orbital elements to radius and velocity
% vector for an Earth orbit

% a      [km]  Semi Major Axis)
% e      [1]   Eccentricity)
% i      [rad] Inclination
% omega  [rad] Right Ascension of the Ascending Node
% w      [rad] Argument of Perigee
% nue    [rad] True anomaly

a = 899.86
e = 0.242086099014791
i = 0.004249579572519763
omega = 1.7570940273336035
w = 1.5914495981529537
nue = 5.721029832760311


mue = 3.98600*10^5;        % [km^3/s^2] Gravitational Parameter of Earth

p = a*(1-e^2);             % [km]       Semi Latus Rectum


r_p = (p*cos(nue))/(1+e*cos(nue));       % Radius Vector in PQW Coordinates
r_q = (p*sin(nue))/(1+e*cos(nue));
r_w = 0;

v_p = -sqrt(mue/p)*sin(nue);             % Velocity Vector in PQW Coordiantes
v_q = sqrt(mue/p)*(e + cos(nue));
v_w = 0.0;

r_pqw = [r_p r_q r_w];                                 % Radius Vector in PQW Coordinates
v_pqw = [v_p v_q v_w];                                 % Velocity Vector in PQW Coordiantes

m11 = cos(omega)*cos(w)-sin(omega)*sin(w)*cos(i);      % Transformation Matrix PQW to IJK
m12 = -cos(omega)*sin(w)-sin(omega)*cos(w)*cos(i);
m13 = sin(omega)*sin(i);
m21 = sin(omega)*cos(w)+cos(omega)*sin(w)*cos(i);
m22 = -sin(omega)*sin(w)+cos(omega)*cos(w)*cos(i);
m23 = -cos(omega)*sin(i);
m31 = sin(w)*sin(i);
m32 = cos(w)*sin(i);
m33 = cos(i);

pqw_to_ijk = [m11 m12 m13; m21 m22 m23; m31 m32 m33];  % Transformation Matrix (pqw to ijk)

r_ijk = pqw_to_ijk*r_pqw';                             % [km]   Radius   Vector in IJK Coordinate System
v_ijk = pqw_to_ijk*v_pqw';                             % [km/s] Velocity Vector in IJK Coordinate System


r_v = [r_ijk' v_ijk'];                               % [km km/s] (Radius and Velocity in IJK)
