import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AppService } from '../../../core/service/app.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-line-graph',
  standalone: true,
  templateUrl: './line-graph.component.html',
  styleUrl: './line-graph.component.scss',
  imports: [CommonModule, FormsModule]
})
export class LineGraphComponent implements OnInit {
  @Input() graphSource: 'averageTravelTime' | 'getAverageWaitingTime' | 'getWeeklyAverageTrips' = 'averageTravelTime';
  graph_type: string = 'averageTravelTime';
  chartInstance: Chart | null = null;

  farm_filter: string = '';
  year_filter: number = 0;
  farm_date: any = '';

  farms = ['farm 1', 'farm 2', 'farm 3']
  years = [1999,2000,2001,2002,2003,2004,2005];

  // Map full weekday names to short forms
  weekdayMap: { [key: string]: string } = {
    'Sunday': 'Sun',
    'Monday': 'Mon',
    'Tuesday': 'Tue',
    'Wednesday': 'Wed',
    'Thursday': 'Thu',
    'Friday': 'Fri',
    'Saturday': 'Sat'
  };

  constructor(private appService: AppService) { }

  chartOptions: any = {
    scales: { y: { beginAtZero: true } },
    plugins: { legend: { display: false } }
  };

  ngOnInit(): void {
    switch (this.graphSource) {
      case 'averageTravelTime':
        this.graph_type = 'averageTravelTime';
        this.getAverageTravelTime();
        break;
      case 'getAverageWaitingTime':
        this.graph_type = 'getAverageWaitingTime';
        this.getAverageWaitingTime();
        break;
      case 'getWeeklyAverageTrips':
        this.graph_type = 'getWeeklyAverageTrips';
        this.getWeeklyAverageTrips();
        break;
    }
    this.farmList();
  }

  getAverageTravelTime() {
    const payload = {};
    this.appService.getAverageTravelTime(payload).subscribe((res: any) => {
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const values = res.data.map((item: any) => parseFloat(item.average_time));

      const canvas = document.getElementById('line_graph') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      const gradient = ctx!.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(0, 100, 0, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 100, 0, 0)');

      this.chartInstance = new Chart(ctx!, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            data: values,
            backgroundColor: gradient,
            borderColor: '#008000',
            borderWidth: 2,
            fill: true,
            pointRadius: 0,
            tension: 0.4
          }]
        },
        options: this.chartOptions
      });
    });
  }

  getAverageWaitingTime() {
    const payload: any = {};

    this.appService.getAverageWaitingTime(payload).subscribe((res: any) => {
      const completed = res.data?.completedTrips || [];
      const inProgress = res.data?.inProgressTrips || [];

      completed.forEach((item: any) => {
        item.weekday = this.weekdayMap[item.weekday] || item.weekday;
      });
      inProgress.forEach((item: any) => {
        item.weekday = this.weekdayMap[item.weekday] || item.weekday;
      });

      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      const mapToSeries = (data: any[], labels: string[]) => {
        const lookup: any = {};
        data.forEach((item: any) => {
          lookup[item.weekday] = parseFloat(item.average_wait);
        });
        return labels.map(label => lookup[label] ?? 0);
      };

      const completedData = mapToSeries(completed, labels);
      const inProgressData = mapToSeries(inProgress, labels);

      const peakCompleted = Math.max(...completedData);
      const peakCompletedIndex = completedData.indexOf(peakCompleted);

      const peakInProgress = Math.max(...inProgressData);
      const peakInProgressIndex = inProgressData.indexOf(peakInProgress);

      const canvas = document.getElementById('waiting_graph_1') as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      this.chartInstance = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Completed',
              data: completedData,
              borderColor: 'green',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.4,
              pointRadius: completedData.map((_: any, i: number) => i === peakCompletedIndex ? 5 : 0),
              pointBackgroundColor: completedData.map((_: any, i: number) => i === peakCompletedIndex ? 'green' : 'transparent')
            },
            {
              label: 'In-Progress',
              data: inProgressData,
              borderColor: 'orange',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.4,
              pointRadius: inProgressData.map((_: any, i: number) => i === peakInProgressIndex ? 5 : 0),
              pointBackgroundColor: inProgressData.map((_: any, i: number) => i === peakInProgressIndex ? 'orange' : 'transparent')
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#333',
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 2, // smaller = more like a dot
                boxHeight: 2
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                // text: 'Average Waiting Time (mins)'
              }
            },
            x: {
              title: {
                display: true,
                // text: 'Day of the Week'
              }
            }
          }
        }
      });
    });
  }

  getWeeklyAverageTrips() {
    const payload: any = {
      start_date: "2025-04-01",
      end_date: "2025-05-17"
    };

    this.appService.getWeeklyAverageTrips(payload).subscribe((res: any) => {
      const completed = res.data?.completedTrips || [];
      const inProgress = res.data?.inProgressTrips || [];

      completed.forEach((item: any) => {
        item.weekday = this.weekdayMap[item.weekday] || item.weekday;
      });
      inProgress.forEach((item: any) => {
        item.weekday = this.weekdayMap[item.weekday] || item.weekday;
      });
      const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

      // Helper to map dataset to label-aligned data
      const mapToSeries = (data: any[], labels: string[]) => {
        const lookup: any = {};
        data.forEach((item: any) => {
          lookup[item.weekday] = parseFloat(item.average_trips);
        });
        return labels.map(label => lookup[label] ?? 0);
      };

      const completedData = mapToSeries(completed, labels);
      const inProgressData = mapToSeries(inProgress, labels);

      const peakCompleted = Math.max(...completedData);
      const peakCompletedIndex = completedData.indexOf(peakCompleted);

      const peakInProgress = Math.max(...inProgressData);
      const peakInProgressIndex = inProgressData.indexOf(peakInProgress);

      const canvas = document.getElementById('waiting_graph_2') as HTMLCanvasElement;
      const ctx = canvas?.getContext('2d');

      this.chartInstance = new Chart(ctx!, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Completed Trips',
              data: completedData,
              borderColor: 'green',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.4,
              pointRadius: completedData.map((_: any, i: number) => i === peakCompletedIndex ? 5 : 0),
              pointBackgroundColor: completedData.map((_: any, i: number) => i === peakCompletedIndex ? 'green' : 'transparent')
            },
            {
              label: 'In-Progress Trips',
              data: inProgressData,
              borderColor: 'orange',
              backgroundColor: 'transparent',
              borderWidth: 2,
              tension: 0.4,
              pointRadius: inProgressData.map((_: any, i: number) => i === peakInProgressIndex ? 5 : 0),
              pointBackgroundColor: inProgressData.map((_: any, i: number) => i === peakInProgressIndex ? 'orange' : 'transparent')
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#333',
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 2, // smaller = more like a dot
                boxHeight: 2
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                // text: 'Average Trips per Truck'
              }
            },
            x: {
              title: {
                display: true,
                // text: 'Day of the Week'
              }
            }
          }
        }
      });
    });
  }

  farmList() {
    const payload: any = {};
    // this.fields.forEach(field => {
    //   if (field.value) this.farmFilters[field.key] = field.value;
    // });

    // if (this.farmFilters.id) payload['id'] = [Number(this.farmFilters.id)];
    // if (this.farmFilters.name) payload['name'] = this.farmFilters.name;
    // if (this.farmFilters.zone) payload['zone'] = Number(this.farmFilters.zone);

    this.appService.farmList(payload).subscribe((data: any) => {
      console.log("Farm data in dashboard", data.data);
    })
  }
}
