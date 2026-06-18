---

title: my Pi5 homelab setup
date: 2026-6-18
tags:

* Homelab
* pi5
  excerpt: my Pi5 homelab setup.

---

# the foundation

this build prioritizes I/O throughput and power stability, moving away from the bottlenecks of SD cards.

## hardware and infra

| Component  | Hardware                                                                                                |
| ---------- | ------------------------------------------------------------------------------------------------------- |
| Compute    | [Raspberry Pi 5](https://www.raspberrypi.com/products/raspberry-pi-5/)                                  |
| Storage    | [Geekworm X1001 PCIe to M.2 Key-M NVMe SSD PIP TOP](https://geekworm.com/products/x1001)                |
| Power      | [Geekworm GaN PD 27W 5.1V 5A Power Supply](https://geekworm.com/products/xsl-gan-27w)                   |
| Networking | [8-Port Gigabit Easy Smart Switch](https://www.tp-link.com/us/home-networking/8-port-switch/tl-sg108e/) |

### PCIe advantage

* by using the Pi 5s PCIe lane with the X1001, i have bypassed the USB bus for storage. this allows for the IOPS necessary to run database heavy services like immich without system wide latency.

### power delivery

* the Pi 5 is extremely sensitive to power fluctuations, dont ask me how i know please, The 27W GaN power supply is non-negotiable for system stability.

# software stack

| Category     | Software                                                         |
| ------------ | ---------------------------------------------------------------- |
| OS           | [RPi OS Headless](https://www.raspberrypi.com/software/)         |
| Management   | [Portainer (Container Orchestration)](https://www.portainer.io/) |
| ingres & ssl | [Nginx Proxy Manager](https://nginxproxymanager.com/)            |
| Networking   | [Tailscale](https://tailscale.com/)                              |

# deployed services

| Category     | Services                                                                                                                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| media        | [jellyfin](https://jellyfin.org/), arr-stack ([Sonarr](https://sonarr.tv/), [Radarr](https://radarr.video/), [Prowlarr](https://prowlarr.com/), [seerr(jellyseerr)](https://docs.seerr.dev/)) |
| Photos       | [immich](https://immich.app/)                                                                                                                                                                 |
| Productivity | [Excalidraw](https://excalidraw.com/), [Code-Server](https://github.com/coder/code-server)                                                                                                    |
| Dashboard    | [Homepage](https://gethomepage.dev/), [Grafana](https://grafana.com/), [Prometheus](https://prometheus.io/)                                                                                   |

# my thoughts

* i opted for NPM for its rapid deployment capability via GUI, though im keeping an eye on caddy for tighter infra-as-code integration later.

* by using tailscale, i can easily manage access to my homelab from anywhere, without needing to open ports on my router or expose my local network. 

* i do intend to change this setup later by moving away from tailscale and securely exposing selected services to the internet.
