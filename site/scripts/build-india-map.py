#!/usr/bin/env python3
"""Legacy DataMeet geometry generator, retained for audit history only.
Source: https://github.com/datameet/maps/States/Admin2.*
This is not verified Survey of India ABDB geometry and must not be described
or published as an official map. About renders project states in text instead.
"""
import json, math, shapefile

LAT0 = 23.0
K = math.cos(math.radians(LAT0))

def build(reader):
    proj = lambda lo, la: (lo * K, -la)
    pts = [proj(lo, la) for sh in reader.shapes() for lo, la in sh.points]
    X0, X1 = min(p[0] for p in pts), max(p[0] for p in pts)
    Y0, Y1 = min(p[1] for p in pts), max(p[1] for p in pts)
    W = 1000.0
    H = W * (Y1 - Y0) / (X1 - X0)

    def to(lo, la):
        x, y = proj(lo, la)
        return ((x - X0) / (X1 - X0) * W, (y - Y0) / (Y1 - Y0) * H)

    def dp(p, tol):
        if len(p) < 3:
            return p
        def d(q, a, b):
            (x, y), (x1, y1), (x2, y2) = q, a, b
            dx, dy = x2 - x1, y2 - y1
            if dx == 0 and dy == 0:
                return math.hypot(x - x1, y - y1)
            t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy)))
            return math.hypot(x - (x1 + t * dx), y - (y1 + t * dy))
        dm, idx = 0, 0
        for i in range(1, len(p) - 1):
            dd = d(p[i], p[0], p[-1])
            if dd > dm:
                dm, idx = dd, i
        return dp(p[:idx + 1], tol)[:-1] + dp(p[idx:], tol) if dm > tol else [p[0], p[-1]]

    def area(p):
        a = 0
        for i in range(len(p)):
            x1, y1 = p[i]
            x2, y2 = p[(i + 1) % len(p)]
            a += x1 * y2 - x2 * y1
        return abs(a) / 2

    out = {}
    for sh, rec in zip(reader.shapes(), reader.records()):
        parts = list(sh.parts) + [len(sh.points)]
        paths = []
        for i in range(len(parts) - 1):
            ring = [to(lo, la) for lo, la in sh.points[parts[i]:parts[i + 1]]]
            if len(ring) < 4:
                continue
            A = area(ring)
            if A < 0.30:          # sub-pixel at any size we render
                continue
            s = dp(ring, max(0.30, min(2.2, math.sqrt(A) / 22)))
            if len(s) < 4:
                continue
            paths.append("M" + " ".join(f"{x:.1f} {y:.1f}" for x, y in s) + "Z")
        if paths:
            out[rec[0]] = "".join(paths)
    return round(W), round(H, 1), out

if __name__ == "__main__":
    w, h, states = build(shapefile.Reader("Admin2"))
    assert len(states) == 36, f"expected 36 states and UTs, got {len(states)}"
    for required in ("Lakshadweep", "Andaman & Nicobar", "Ladakh", "Jammu & Kashmir"):
        assert required in states, f"missing {required}"
    print(json.dumps({"width": w, "height": h, "count": len(states)}))
