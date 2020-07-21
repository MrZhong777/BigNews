$(function () {
    // 获取统计数据
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/data/info',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            $(".spannel:eq(0) em").text(backData.totalArticle);
            $(".scolor01 em").text(backData.dayArticle);
            $(".scolor02 em").text(backData.totalComment);
            $(".scolor03 em").text(backData.dayComment);
        }
    });

    // 日新增文章数量统计
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/data/article',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            var xData = [];
            var yData = [];
            for (let i = 0; i < backData.date.length; i++) {
                xData.push(backData.date[i].date);
                yData.push(backData.date[i].count);
            }

            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('curve_show'));
            // 指定图表的配置项和数据
            var option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
                legend: {
                    data: ['新增文章'],
                    top: 30
                },
                title: {
                    left: 'center',
                    text: '日新增文章数',
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: xData
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                series: [
                    {
                        name: '新增文章',
                        type: 'line',
                        smooth: true,
                        symbolSize: 8,
                        itemStyle: {
                            color: 'rgb(255, 163, 57)'
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgb(255, 224, 187)'
                            }, {
                                offset: 1,
                                color: 'rgb(255, 255, 253)'
                            }])
                        },
                        data: yData
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        }
    });

    // 文章分类数量比
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/data/category',
        type: 'get',
        dataType: 'json',
        success: function (backData) {
            (function () {
                var cartecory = [];
                var data = [];
                for (let i = 0; i < backData.date.length; i++) {
                    cartecory.push(backData.date[i].name);
                    data.push({
                        value: backData.date[i].articles,
                        name: backData.date[i].name
                    });
                }
                console.log(cartecory, data);

                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('pie_show'));
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)'
                    },
                    title: {
                        left: 'center',
                        text: '文章分类数量比',
                    },
                    color: ['#ff0000', '#00ff00', '#0000ff', '#fff000', '#f0f'],
                    legend: {
                        left: 'center',
                        top: 30,
                        data: cartecory
                    },
                    series: [
                        {
                            name: '分类名称',
                            type: 'pie',
                            radius: ['40%', '60%'],
                            center: ["50%", "60%"],
                            avoidLabelOverlap: false,
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '20',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: true
                            },
                            data: data
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

            })();
        }
    });
});